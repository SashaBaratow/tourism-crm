import { db } from "../db";

export async function getToursList() {
    return db.query.tours.findMany({
        with: {
            assignments: {
                with: {
                    staff: true,
                },
            },
        },
        orderBy: (tours, { asc }) => [asc(tours.startDatetime)],
    });
}