"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createTourRequest } from "../api/create-tour";

import {TourFormInput, tourFormSchema, type TourFormValues} from "@/entities/tour/model/schemas";
import { getDurationMinutes } from "@/entities/tour/lib/get-duration-minutes";
import { formatDurationMinutes } from "@/shared/lib/format/duration";

import { Button } from "@/shared/ui/components/ui/button";
import { Input } from "@/shared/ui/components/ui/input";
import { Label } from "@/shared/ui/components/ui/label";
import { Textarea } from "@/shared/ui/components/ui/textarea";

export function CreateTourForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TourFormInput>({
        resolver: zodResolver(tourFormSchema),
        defaultValues: {
            tourName: "",
            startDateTime: "",
            finishDateTime: "",
            touristsCount: 1,
            tourPrice: "",
            status: "draft",
            description: "",
            notes: "",
        },
        mode: "onBlur",
    });

    const startDateTime = watch("startDateTime");
    const finishDateTime = watch("finishDateTime");

    const durationLabel = useMemo(() => {
        const durationMinutes = getDurationMinutes(startDateTime, finishDateTime);

        if (!durationMinutes) {
            return "—";
        }

        return formatDurationMinutes(durationMinutes);
    }, [startDateTime, finishDateTime]);

    const router = useRouter();

    const onSubmit = async (values: TourFormValues) => {
        const createdTour = await createTourRequest(values);

        router.push(`/tours/${createdTour.id}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="tourName">Tour name</Label>
                    <Input
                        id="tourName"
                        placeholder="Enter tour name"
                        {...register("tourName")}
                    />
                    {errors.tourName && (
                        <p className="text-sm text-red-500">{errors.tourName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="startDateTime">Start date & time</Label>
                    <Input
                        id="startDateTime"
                        type="datetime-local"
                        {...register("startDateTime")}
                    />
                    {errors.startDateTime && (
                        <p className="text-sm text-red-500">{errors.startDateTime.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="finishDateTime">Finish date & time</Label>
                    <Input
                        id="finishDateTime"
                        type="datetime-local"
                        {...register("finishDateTime")}
                    />
                    {errors.finishDateTime && (
                        <p className="text-sm text-red-500">{errors.finishDateTime.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>Duration</Label>
                    <div className="flex h-10 items-center rounded-md border px-3 text-sm text-muted-foreground">
                        {durationLabel}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="touristsCount">Tourists count</Label>
                    <Input
                        id="touristsCount"
                        type="number"
                        min={1}
                        {...register("touristsCount", { valueAsNumber: true })}
                    />
                    {errors.touristsCount && (
                        <p className="text-sm text-red-500">{errors.touristsCount.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tourPrice">Tour price</Label>
                    <Input
                        id="tourPrice"
                        placeholder="e.g. 1200"
                        {...register("tourPrice")}
                    />
                    {errors.tourPrice && (
                        <p className="text-sm text-red-500">{errors.tourPrice.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                        id="status"
                        className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
                        {...register("status")}
                    >
                        <option value="draft">Draft</option>
                        <option value="planned">Planned</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    {errors.status && (
                        <p className="text-sm text-red-500">{errors.status.message}</p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter description"
                        rows={4}
                        {...register("description")}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                        id="notes"
                        placeholder="Internal notes"
                        rows={4}
                        {...register("notes")}
                    />
                    {errors.notes && (
                        <p className="text-sm text-red-500">{errors.notes.message}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create tour"}
                </Button>
            </div>
        </form>
    );
}