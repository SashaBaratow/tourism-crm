import {
    integer,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import { staffRoleEnum, staffStatusEnum } from "./enums";

export const staff = pgTable("staff", {
    id: serial("id").primaryKey(),
    role: staffRoleEnum("role").notNull(),
    firstName: varchar("first_name", { length: 120 }).notNull(),
    lastName: varchar("last_name", { length: 120 }).notNull(),
    age: integer("age"),
    language: varchar("language", { length: 120 }),
    salary: numeric("salary", { precision: 12, scale: 2 }),
    phone: varchar("phone", { length: 30 }),
    status: staffStatusEnum("status").notNull().default("active"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});