import { z } from "zod";

export const TOUR_STATUSES = [
    "draft",
    "planned",
    "active",
    "completed",
    "cancelled",
] as const;

export const tourFormSchema = z
    .object({
        tourName: z
            .string()
            .trim()
            .min(2, "Tour name must be at least 2 characters")
            .max(255, "Tour name is too long"),

        startDateTime: z
            .string()
            .min(1, "Start date is required"),

        finishDateTime: z
            .string()
            .min(1, "Finish date is required"),

        touristsCount: z
            .number()
            .int("Tourists count must be an integer")
            .min(1, "Tourists count must be at least 1"),

        tourPrice: z
            .string()
            .trim()
            .min(1, "Tour price is required")
            .refine((value) => {
                const normalized = value.replace(",", ".");
                const numberValue = Number(normalized);

                return Number.isFinite(numberValue) && numberValue >= 0;
            }, "Tour price must be a valid positive number"),

        status: z.enum(TOUR_STATUSES),

        description: z
            .string()
            .trim()
            .max(2000, "Description is too long")
            .optional()
            .or(z.literal("")),

        notes: z
            .string()
            .trim()
            .max(2000, "Notes are too long")
            .optional()
            .or(z.literal("")),
    })
    .refine((data) => {
        const start = new Date(data.startDateTime);
        const finish = new Date(data.finishDateTime);

        if (Number.isNaN(start.getTime()) || Number.isNaN(finish.getTime())) {
            return false;
        }

        return finish > start;
    }, {
        message: "Finish date must be later than start date",
        path: ["finishDateTime"],
    });

export type TourFormInput = z.input<typeof tourFormSchema>;
export type TourFormValues = z.output<typeof tourFormSchema>;