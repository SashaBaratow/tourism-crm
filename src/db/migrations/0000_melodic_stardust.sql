CREATE TYPE "public"."assignment_role" AS ENUM('guide', 'driver', 'cook');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('guide', 'driver', 'cook');--> statement-breakpoint
CREATE TYPE "public"."staff_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."tour_status" AS ENUM('draft', 'planned', 'active', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "managers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"login" varchar(120) NOT NULL,
	"password_hash" text NOT NULL,
	"active_status" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "managers_email_unique" UNIQUE("email"),
	CONSTRAINT "managers_login_unique" UNIQUE("login")
);
--> statement-breakpoint
CREATE TABLE "staff" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "staff_role" NOT NULL,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"age" integer,
	"language" varchar(120),
	"salary" numeric(12, 2),
	"phone" varchar(30),
	"status" "staff_status" DEFAULT 'active' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" serial PRIMARY KEY NOT NULL,
	"driver_id" integer NOT NULL,
	"mark" varchar(120) NOT NULL,
	"model" varchar(120) NOT NULL,
	"license_plate" varchar(50) NOT NULL,
	"places_count" integer,
	"notes" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tours" (
	"id" serial PRIMARY KEY NOT NULL,
	"tour_name" varchar(255) NOT NULL,
	"start_datetime" timestamp NOT NULL,
	"finish_datetime" timestamp NOT NULL,
	"duration_minutes" integer,
	"tourists_count" integer DEFAULT 0 NOT NULL,
	"tour_price" numeric(12, 2),
	"status" "tour_status" DEFAULT 'draft' NOT NULL,
	"description" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tour_staff_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"tour_id" integer NOT NULL,
	"staff_id" integer NOT NULL,
	"assignment_role" "assignment_role" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_driver_id_staff_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."staff"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_staff_assignments" ADD CONSTRAINT "tour_staff_assignments_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_staff_assignments" ADD CONSTRAINT "tour_staff_assignments_staff_id_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "tour_staff_assignments_unique_idx" ON "tour_staff_assignments" USING btree ("tour_id","staff_id","assignment_role");