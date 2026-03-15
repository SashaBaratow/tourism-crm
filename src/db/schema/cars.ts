import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { staff } from "./staff";

export const cars = pgTable("cars", {
    id: serial("id").primaryKey(),
    driverId: integer("driver_id")
        .notNull()
        .references(() => staff.id, { onDelete: "restrict" }),
    mark: varchar("mark", { length: 120 }).notNull(),
    model: varchar("model", { length: 120 }).notNull(),
    licensePlate: varchar("license_plate", { length: 50 }).notNull(),
    placesCount: integer("places_count"),
    notes: text("notes"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});