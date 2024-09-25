import type { Config } from 'drizzle-kit'

export const credentials = {
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: false,
}

export default {
    schema: './src/schema.ts',
    dialect: 'postgresql',
    out: './drizzle',
    dbCredentials: credentials,
} satisfies Config
