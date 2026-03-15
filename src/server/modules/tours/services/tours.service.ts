import { toursRepository } from "../repositories/tours.repository";
import type { TourDetails } from "@/entities/tour/model/types";

export class ToursService {
    async getTourById(tourId: number): Promise<TourDetails | null> {
        return toursRepository.getTourById(tourId);
    }
}

export const toursService = new ToursService();