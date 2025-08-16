CREATE TYPE "public"."classification" AS ENUM('racist', 'non-racist');--> statement-breakpoint
CREATE TABLE "ai_results" (
	"id" varchar PRIMARY KEY NOT NULL,
	"text" varchar NOT NULL,
	"classification" "classification" NOT NULL,
	"confidence" numeric NOT NULL,
	"source" varchar NOT NULL,
	"collected_at" timestamp DEFAULT now()
);
