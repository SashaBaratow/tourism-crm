"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {tourFormSchema, TourFormValues} from "@/entities/tour/model/schemas";
import {Input} from "@/shared/ui/components/ui/input";
import {Textarea} from "@/shared/ui/components/ui/textarea";
import {Button} from "@/shared/ui/components/ui/button";


type TourFormProps = {
    mode: "create" | "edit";
    defaultValues?: TourFormValues;
    onSubmit: (values: TourFormValues) => Promise<void> | void;
    isPending?: boolean;
};

export function UpdateTourForm(
    {
        mode,
        defaultValues,
        onSubmit,
        isPending = false,
    }: TourFormProps) {
    const form = useForm<TourFormValues>({
        resolver: zodResolver(tourFormSchema),
        defaultValues: defaultValues ?? {
            tourName: "",
            startDateTime: "",
            finishDateTime: "",
            touristsCount: 0,
            tourPrice: "",
            status: "draft",
            description: "",
            notes: "",
        },
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = form;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Input placeholder="Tour name" {...register("tourName")} />
                {errors.tourName && (
                    <p className="text-sm text-red-500">{errors.tourName.message}</p>
                )}
            </div>

            <div>
                <Input
                    type="datetime-local"
                    {...register("startDateTime", {valueAsDate: true})}
                />
                {errors.startDateTime && (
                    <p className="text-sm text-red-500">{errors.startDateTime.message}</p>
                )}
            </div>

            <div>
                <Input
                    type="datetime-local"
                    {...register("finishDateTime", {valueAsDate: true})}
                />
                {errors.finishDateTime && (
                    <p className="text-sm text-red-500">{errors.finishDateTime.message}</p>
                )}
            </div>

            <div>
                <Input
                    type="number"
                    min={0}
                    {...register("touristsCount", {valueAsNumber: true})}
                />
                {errors.touristsCount && (
                    <p className="text-sm text-red-500">{errors.touristsCount.message}</p>
                )}
            </div>

            <div>
                <Input placeholder="Tour price" {...register("tourPrice")} />
                {errors.tourPrice && (
                    <p className="text-sm text-red-500">{errors.tourPrice.message}</p>
                )}
            </div>

            <div>
                <select
                    className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
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

            <div>
                <Textarea placeholder="Description" {...register("description")} />
            </div>

            <div>
                <Textarea placeholder="Notes" {...register("notes")} />
            </div>

            <Button type="submit" disabled={isPending}>
                {mode === "edit" ? "Save changes" : "Create tour"}
            </Button>
        </form>
    );
}