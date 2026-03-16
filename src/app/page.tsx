import {getToursList} from "@/server/repositories/tours.repository";
import Link from "next/link";

export default async function HomePage() {


    const tours = await getToursList();

    return (
        <main className="min-h-screen bg-muted/30 p-6">
            <div className="mx-auto max-w-6xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tourism CRM</h1>
                    <p className="text-muted-foreground">
                        Dashboard and tours overview
                    </p>
                </div>

                <section className="rounded-2xl border bg-background p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">Tours</h2>
                    <Link href={'/tours/create'}  > create new tour</Link>

                    {tours.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No tours found.</p>
                    ) : (
                        <div className="space-y-4">
                            {tours.map((tour) => (
                                <div
                                    key={tour.id}
                                    className="rounded-xl border p-4 transition-colors hover:bg-muted/40"
                                >
                                    <div className={'w-full flex justify-end items-center mb-4'}>
                                        <Link className={'font-bold text-[blue] border-2 py-1 px-2'} href={`/tours/${tour.id}`}>Open details</Link>
                                    </div>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold">{tour.tourName}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Status: {tour.status}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Tourists: {tour.touristsCount}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Start: {new Date(tour.startDatetime).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Finish: {new Date(tour.finishDatetime).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="min-w-[220px]">
                                            <p className="mb-2 text-sm font-medium">Assigned staff</p>

                                            {tour.assignments.length === 0 ? (
                                                <p className="text-sm text-muted-foreground">
                                                    No staff assigned
                                                </p>
                                            ) : (
                                                <ul className="space-y-2 text-sm">
                                                    {tour.assignments.map((assignment) => (
                                                        <li
                                                            key={assignment.id}
                                                            className="rounded-lg bg-muted px-3 py-2"
                                                        >
                                                          <span className="font-medium">
                                                            {assignment.staff.firstName}{" "}
                                                              {assignment.staff.lastName}
                                                          </span>{" "}
                                                            — {assignment.assignmentRole}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}