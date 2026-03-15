export type TourStatus =
    | "draft"
    | "planned"
    | "active"
    | "completed"
    | "cancelled";

export type AssignmentRole = "guide" | "driver" | "cook";

export interface TourAssignmentStaff {
    id: number;
    firstName: string;
    lastName: string;
    role: AssignmentRole;
    phone: string | null;
    language: string | null;
}

export interface TourAssignment {
    id: number;
    assignmentRole: AssignmentRole;
    createdAt: string;
    staff: TourAssignmentStaff;
}

export interface TourDetails {
    id: number;
    tourName: string;
    startDateTime: string;
    finishDateTime: string;
    durationMinutes: number;
    touristsCount: number;
    tourPrice: string;
    status: TourStatus;
    description: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    assignments: TourAssignment[];
}