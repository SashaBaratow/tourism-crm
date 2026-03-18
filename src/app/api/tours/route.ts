import { NextResponse } from "next/server";
import {z, ZodError} from "zod";

import { toursService } from "@/server/modules/tours/services/tours.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const createdTour = await toursService.createTour(body);

        return NextResponse.json(createdTour, { status: 201 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    issues: z.treeifyError(error),
                },
                { status: 400 }
            );
        }

        console.error("Failed to create tour:", error);

        return NextResponse.json(
            { message: "Failed to create tour" },
            { status: 500 }
        );
    }
}