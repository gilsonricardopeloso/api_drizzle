"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRelations = exports.posts = exports.usersToRolesRelations = exports.usersToRoles = exports.rolesRelations = exports.roles = exports.loginCount = exports.usersRelations = exports.users = exports.authSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.authSchema = (0, pg_core_1.pgSchema)('auth');
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    uuid: (0, pg_core_1.uuid)('user_uuid').defaultRandom().notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    email_verified: (0, pg_core_1.boolean)('email_verified').default(false),
    password: (0, pg_core_1.text)('password'),
    avatar: (0, pg_core_1.text)('avatar'),
    username: (0, pg_core_1.varchar)('username', { length: 255 }).notNull().unique(),
    role: (0, pg_core_1.varchar)('role').notNull().default('user'),
    firstName: (0, pg_core_1.varchar)('first_name'),
    lastName: (0, pg_core_1.varchar)('last_name'),
    posts: (0, pg_core_1.json)('posts').notNull().default([]),
    timezone: (0, pg_core_1.varchar)('timezone'),
    birthday: (0, pg_core_1.date)('birthday'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => {
    return {
        emailIdx: (0, pg_core_1.index)('user_email_idx').on(table.email),
    };
});
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    usersToRoles: many(exports.usersToRoles),
    posts: many(exports.posts),
}));
exports.loginCount = exports.authSchema.table('login_count', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').references(() => exports.users.id),
    ip: (0, pg_core_1.varchar)('ip', { length: 45 }).notNull(),
    location: (0, pg_core_1.varchar)('location', { length: 255 }),
    userAgent: (0, pg_core_1.text)('user_agent'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
exports.roles = (0, pg_core_1.pgTable)('roles', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name').notNull(),
    permissions: (0, pg_core_1.json)('permissions').notNull().default([]),
});
exports.rolesRelations = (0, drizzle_orm_1.relations)(exports.roles, ({ many }) => ({
    usersToRoles: many(exports.usersToRoles),
}));
exports.usersToRoles = (0, pg_core_1.pgTable)('users_to_roles', {
    userId: (0, pg_core_1.integer)('user_id')
        .notNull()
        .references(() => exports.users.id),
    roleId: (0, pg_core_1.integer)('role_id')
        .notNull()
        .references(() => exports.roles.id),
}, (table) => {
    return {
        pk: (0, pg_core_1.primaryKey)({ columns: [table.userId, table.roleId] }),
    };
});
exports.usersToRolesRelations = (0, drizzle_orm_1.relations)(exports.usersToRoles, ({ one }) => ({
    roles: one(exports.roles, {
        fields: [exports.usersToRoles.roleId],
        references: [exports.roles.id],
    }),
    user: one(exports.users, {
        fields: [exports.usersToRoles.userId],
        references: [exports.users.id],
    }),
}));
exports.posts = (0, pg_core_1.pgTable)('posts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull(),
    editedAt: (0, pg_core_1.timestamp)('edited_at'),
    title: (0, pg_core_1.varchar)('title').notNull(),
    authorId: (0, pg_core_1.integer)('author_id').references(() => exports.users.id),
    content: (0, pg_core_1.text)('content').notNull(),
    tags: (0, pg_core_1.json)('tags').notNull().default(['Webxnet']),
});
exports.postsRelations = (0, drizzle_orm_1.relations)(exports.posts, ({ one }) => ({
    author: one(exports.users, {
        fields: [exports.posts.authorId],
        references: [exports.users.id],
    }),
}));
//# sourceMappingURL=schema.js.map