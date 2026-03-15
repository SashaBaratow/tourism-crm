import { and, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { staff, tourStaffAssignments, tours } from "@/db/schema";
import type { TourDetails } from "@/entities/tour/model/types";

export class ToursRepository {
    async getTourById(tourId: number): Promise<TourDetails | null> {
        const tourRows = await db
            .select()
            .from(tours)
            .where(eq(tours.id, tourId))
            .limit(1);

        const tour = tourRows[0];

        if (!tour) {
            return null;
        }

        const assignmentRows = await db
            .select({
                assignmentId: tourStaffAssignments.id,
                assignmentRole: tourStaffAssignments.assignmentRole,
                assignmentCreatedAt: tourStaffAssignments.createdAt,

                staffId: staff.id,
                firstName: staff.firstName,
                lastName: staff.lastName,
                role: staff.role,
                phone: staff.phone,
                language: staff.language,
            })
            .from(tourStaffAssignments)
            .innerJoin(staff, eq(tourStaffAssignments.staffId, staff.id))
            .where(eq(tourStaffAssignments.tourId, tourId));

        return {
            id: tour.id,
            tourName: tour.tourName,
            startDateTime: tour.startDatetime.toISOString(),
            finishDateTime: tour.finishDatetime.toISOString(),
            durationMinutes: tour.durationMinutes,
            touristsCount: tour.touristsCount,
            tourPrice: String(tour.tourPrice),
            status: tour.status,
            description: tour.description,
            notes: tour.notes,
            createdAt: tour.createdAt.toISOString(),
            updatedAt: tour.updatedAt.toISOString(),
            assignments: assignmentRows.map((item) => ({
                id: item.assignmentId,
                assignmentRole: item.assignmentRole,
                createdAt: item.assignmentCreatedAt.toISOString(),
                staff: {
                    id: item.staffId,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    role: item.role,
                    phone: item.phone,
                    language: item.language,
                },
            })),
        };
    }
}

export const toursRepository = new ToursRepository();