import { pgEnum } from "drizzle-orm/pg-core";

export const staffRoleEnum = pgEnum("staff_role", [
    "guide",
    "driver",
    "cook",
]);

export const staffStatusEnum = pgEnum("staff_status", [
    "active",
    "inactive",
]);

export const tourStatusEnum = pgEnum("tour_status", [
    "draft",
    "planned",
    "active",
    "completed",
    "cancelled",
]);

export const assignmentRoleEnum = pgEnum("assignment_role", [
    "guide",
    "driver",
    "cook",
]);