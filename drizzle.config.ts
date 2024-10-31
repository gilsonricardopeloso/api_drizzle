import type { Config } from 'drizzle-kit'
import dotenv from 'dotenv'

dotenv.config()
// montando a URL
const type = process.env.DB_TYPE as string
const port = parseInt(process.env.DB_PORT as string, 10)
const host = process.env.DB_HOST as string
const user = process.env.DB_USER as string
const password = process.env.DB_PASS as string
const database = process.env.DB_NAME as string
const dbURL = `${type}://${user}:${password}@${host}:${port}/${database}?schema=public`

export const credentials = {
    url: dbURL,
    ssl: false,
}

export default {
    schema: './src/drizzle/schema.ts',
    dialect: 'postgresql',
    out: './drizzle',
    dbCredentials: credentials,
} satisfies Config
