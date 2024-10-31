import {
    serial,
    text,
    timestamp,
    varchar,
    boolean,
    pgTable,
    pgEnum,
    uuid,
} from 'drizzle-orm/pg-core'
import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm'

import { v4 as uuidv4 } from 'uuid'

export const userRole = pgEnum('user_role', ['user', 'admin'])

// Define the "users" table
export const users = pgTable('users', {
    id: uuid('id')
        .primaryKey()
        .$default(() => uuidv4()),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    isEmailVerified: boolean('is_email_verified').notNull(),
    role: userRole('role').default('user'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
    isDisabled: boolean('is_disabled').notNull().default(false),
})

export type InsertUser = InferInsertModel<typeof users>
export type SelectUser = InferSelectModel<typeof users>


