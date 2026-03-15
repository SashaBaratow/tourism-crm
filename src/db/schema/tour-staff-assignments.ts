import {
    integer,
    pgTable,
    serial,
    timestamp,
    uniqueIndex,
} from "drizzle-orm/pg-core";
import { assignmentRoleEnum } from "./enums";
import { tours } from "./tours";
import { staff } from "./staff";

export const tourStaffAssignments = pgTable(
    "tour_staff_assignments",
    {
        id: serial("id").primaryKey(),
        tourId: integer("tour_id")
            .notNull()
            .references(() => tours.id, { onDelete: "cascade" }),
        staffId: integer("staff_id")
            .notNull()
            .references(() => staff.id, { onDelete: "restrict" }),
        assignmentRole: assignmentRoleEnum("assignment_role").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        uniqueAssignment: uniqueIndex("tour_staff_assignments_unique_idx").on(
            table.tourId,
            table.staffId,
            table.assignmentRole
        ),
    })
);