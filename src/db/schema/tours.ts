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
    durationMinutes: integer("duration_minutes").notNull(),
    touristsCount: integer("tourists_count").notNull().default(0),
    tourPrice: numeric("tour_price", { precision: 12, scale: 2 }),
    status: tourStatusEnum("status").notNull().default("draft"),
    description: text("description"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const staff = pgTable("staff", {
    id: serial("id").primaryKey(),
    role: varchar("role", { length: 50 }).notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    age: integer("age"),
    language: varchar("language", { length: 255 }),
    salary: numeric("salary", { precision: 12, scale: 2 }),
    phone: varchar("phone", { length: 50 }),
    isActive: integer("is_active").notNull().default(1),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).defaultNow().notNull(),
});

export const tourStaffAssignments = pgTable("tour_staff_assignments", {
    id: serial("id").primaryKey(),
    tourId: integer("tour_id").notNull(),
    staffId: integer("staff_id").notNull(),
    assignmentRole: varchar("assignment_role", { length: 50 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow().notNull(),
});