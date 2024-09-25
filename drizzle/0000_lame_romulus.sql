CREATE SCHEMA "auth";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."login_count" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"ip" varchar(45) NOT NULL,
	"location" varchar(255),
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"title" varchar NOT NULL,
	"author_id" integer,
	"content" text NOT NULL,
	"tags" json DEFAULT '["Webxnet"]'::json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"permissions" json DEFAULT '[]'::json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false,
	"password" text,
	"avatar" text,
	"username" varchar(255) NOT NULL,
	"role" varchar DEFAULT 'user' NOT NULL,
	"posts" json DEFAULT '[]'::json NOT NULL,
	"timezone" varchar,
	"birthday" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "users_to_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth"."login_count" ADD CONSTRAINT "login_count_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_roles" ADD CONSTRAINT "users_to_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "users" USING btree ("email");