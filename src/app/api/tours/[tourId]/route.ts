import { NextRequest, NextResponse } from "next/server";
import { tourIdParamsSchema } from "@/server/modules/tours/validators/tours.validators";
import { toursService } from "@/server/modules/tours/services/tours.service";
import { z } from "zod";

type RouteContext = {
    params: Promise<{
        tourId: string;
    }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
    try {
        const params = await context.params;

        const parsed = tourIdParamsSchema.safeParse(params);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    message: "Invalid tour id",
                    errors: z.treeifyError(parsed.error),
                },
                { status: 400 }
            );
        }

        const tour = await toursService.getTourById(parsed.data.tourId);

        if (!tour) {
            return NextResponse.json(
                { message: "Tour not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(tour, { status: 200 });
    } catch (error) {
        console.error("GET /api/tours/[tourId] error:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}