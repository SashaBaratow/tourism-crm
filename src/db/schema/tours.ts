import {
    integer,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { tourStatusEnum } from "./enums";

export const tours = pgTable("tours", {
    id: serial("id").primaryKey(),
    tourName: varchar("tour_name", { length: 255 }).notNull(),
    startDatetime: timestamp("start_datetime").notNull(),
    finishDatetime: timestamp("finish_datetime").notNull(),
    durationMinutes: integer("duration_minutes"),
    touristsCount: integer("tourists_count").notNull().default(0),
    tourPrice: numeric("tour_price", { precision: 12, scale: 2 }),
    status: tourStatusEnum("status").notNull().default("draft"),
    description: text("description"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});