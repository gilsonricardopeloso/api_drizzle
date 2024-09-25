import {
    boolean,
    date,
    json,
    index,
    integer,
    serial,
    text,
    timestamp,
    uuid,
    varchar,
    pgTable,
    primaryKey,
    pgSchema,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const authSchema = pgSchema('auth')

export const users = pgTable(
    'users',
    {
        id: serial('id').primaryKey(),
        uuid: uuid('user_uuid').defaultRandom().notNull(),
        email: text('email').notNull().unique(),
        email_verified: boolean('email_verified').default(false),
        password: text('password'),
        avatar: text('avatar'),
        username: varchar('username', { length: 255 }).notNull().unique(),
        role: varchar('role').notNull().default('user'),
        firstName: varchar('first_name'),
        lastName: varchar('last_name'),
        posts: json('posts').notNull().default([]),
        timezone: varchar('timezone'),
        birthday: date('birthday'),
        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
    },
    (table) => {
        return {
            emailIdx: index('user_email_idx').on(table.email),
        }
    },
)

export const usersRelations = relations(users, ({ many }) => ({
    usersToRoles: many(usersToRoles),
    posts: many(posts),
}))

export const loginCount = authSchema.table('login_count', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    ip: varchar('ip', { length: 45 }).notNull(),
    location: varchar('location', { length: 255 }),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').defaultNow(),
})

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    permissions: json('permissions').notNull().default([]),
})

export const rolesRelations = relations(roles, ({ many }) => ({
    usersToRoles: many(usersToRoles),
}))

export const usersToRoles = pgTable(
    'users_to_roles',
    {
        userId: integer('user_id')
            .notNull()
            .references(() => users.id),
        roleId: integer('role_id')
            .notNull()
            .references(() => roles.id),
    },
    (table) => {
        return {
            pk: primaryKey({ columns: [table.userId, table.roleId] }),
        }
    },
)

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
    roles: one(roles, {
        fields: [usersToRoles.roleId],
        references: [roles.id],
    }),
    user: one(users, {
        fields: [usersToRoles.userId],
        references: [users.id],
    }),
}))

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull(),
    editedAt: timestamp('edited_at'),
    title: varchar('title').notNull(),
    authorId: integer('author_id').references(() => users.id),
    content: text('content').notNull(),
    tags: json('tags').notNull().default(['Webxnet']),
})

export const postsRelations = relations(posts, ({ one }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id],
    }),
}))
