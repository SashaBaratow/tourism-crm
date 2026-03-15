import type {TourAssignment} from "../model/types";

interface TourAssignmentsCardProps {
    assignments: TourAssignment[];
}

export function TourAssignmentsCard(
    {
        assignments,
    }: TourAssignmentsCardProps) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Assigned staff</h2>
                <p className="text-sm text-muted-foreground">
                    Guides, drivers and cooks assigned to this tour
                </p>
            </div>

            {assignments.length === 0 ? (
                <div className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                    No staff assigned yet.
                </div>
            ) : (
                <div className="space-y-3">
                    {assignments.map((assignment) => (
                        <div
                            key={assignment.id}
                            className="rounded-xl border bg-slate-50 p-4"
                        >
                            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                                <div>
                                    <p className="text-sm font-semibold">
                                        {assignment.staff.firstName} {assignment.staff.lastName}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Role in staff: {assignment.staff.role}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Assignment role: {assignment.assignmentRole}
                                    </p>
                                </div>

                                <div className="text-sm text-muted-foreground">
                                    <p>Phone: {assignment.staff.phone || "—"}</p>
                                    <p>Language: {assignment.staff.language || "—"}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}