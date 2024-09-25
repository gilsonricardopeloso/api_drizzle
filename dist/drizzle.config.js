"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
exports.credentials = {
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: false,
};
exports.default = {
    schema: './src/schema.ts',
    dialect: 'postgresql',
    out: './drizzle',
    dbCredentials: exports.credentials,
};
//# sourceMappingURL=drizzle.config.js.map