import { toursRepository } from "../repositories/tours.repository";
import type { TourDetails } from "@/entities/tour/model/types";
import {parseCreateTourInput} from "@/server/modules/tours/validators/tours.validators";
import {getDurationMinutes} from "@/entities/tour/lib/get-duration-minutes";

export class ToursService {
    async getTourById(tourId: number): Promise<TourDetails | null> {
        return toursRepository.getTourById(tourId);
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
}

export const toursService = new ToursService();