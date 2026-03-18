import { toursRepository } from "../repositories/tours.repository";
import type { TourDetails } from "@/entities/tour/model/types";
import {parseCreateTourInput} from "@/server/modules/tours/validators/tours.validators";
import {getDurationMinutes} from "@/entities/tour/lib/get-duration-minutes";
import {TourFormInput, tourFormSchema, TourFormValues} from "@/entities/tour/model/schemas";
import {db} from "@/server/db";
import {tours} from "@/db/schema";
import {eq} from "drizzle-orm";

export class ToursService {
    async getTourById(tourId: number): Promise<TourDetails | null> {
        return toursRepository.getTourById(tourId);
    }
    async getTourByIdQuery(tourId: number) {
        const [tour] = await db
            .select()
            .from(tours)
            .where(eq(tours.id, tourId))
            .limit(1);

        return tour ?? null;
    }
    async createTour(input: unknown) {
        const parsed = parseCreateTourInput(input);

        const durationMinutes = getDurationMinutes(
            parsed.startDateTime,
            parsed.finishDateTime
        );

        return toursRepository.createTour({
            tourName: parsed.tourName,
            startDateTime: new Date(parsed.startDateTime),
            finishDateTime: new Date(parsed.finishDateTime),
            durationMinutes,
            touristsCount: parsed.touristsCount,
            tourPrice: parsed.tourPrice,
            status: parsed.status,
            description: parsed.description || null,
            notes: parsed.notes || null,
        });
    }
    async  updateTour(id: number, input: TourFormValues) {
        const parsed = tourFormSchema.parse(input);

        const durationMinutes = getDurationMinutes(
            parsed.startDateTime,
            parsed.finishDateTime
        );

        const [updatedTour] = await db
            .update(tours)
            .set({
                tourName: parsed.tourName,
                startDateTime: new Date(parsed.startDateTime),
                finishDateTime: new Date(parsed.finishDateTime),
                durationMinutes,
                touristsCount: parsed.touristsCount,
                tourPrice: parsed.tourPrice ? parsed.tourPrice : null,
                status: parsed.status,
                description: parsed.description ?? null,
                notes: parsed.notes ?? null,
                updatedAt: new Date(),
            })
            .where(eq(tours.id, id))
            .returning();

        return updatedTour ?? null;
    }
}

export const toursService = new ToursService();