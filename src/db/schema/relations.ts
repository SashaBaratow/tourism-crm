import { relations } from "drizzle-orm";
import { managers } from "./managers";
import { staff } from "./staff";
import { cars } from "./cars";
import { tours } from "./tours";
import { tourStaffAssignments } from "./tour-staff-assignments";

export const staffRelations = relations(staff, ({ many }) => ({
    cars: many(cars),
    assignments: many(tourStaffAssignments),
}));

export const carsRelations = relations(cars, ({ one }) => ({
    driver: one(staff, {
        fields: [cars.driverId],
        references: [staff.id],
    }),
}));

export const toursRelations = relations(tours, ({ many }) => ({
    assignments: many(tourStaffAssignments),
}));

export const tourStaffAssignmentsRelations = relations(
    tourStaffAssignments,
    ({ one }) => ({
        tour: one(tours, {
            fields: [tourStaffAssignments.tourId],
            references: [tours.id],
        }),
        staff: one(staff, {
            fields: [tourStaffAssignments.staffId],
            references: [staff.id],
        }),
    })
);

// Пока managers отдельно, потому что прямых FK еще нет
export const managersRelations = relations(managers, () => ({}));