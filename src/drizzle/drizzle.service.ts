import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
    private pgPool: Pool
    private _db: NodePgDatabase<typeof schema>

    constructor(private configService: ConfigService) {
        this.pgPool = new Pool({
            host: this.configService.get('DB_HOST'),
            port: this.configService.get('DB_PORT'),
            user: this.configService.get('DB_USER'),
            password: this.configService.get('DB_PASS'),
            database: this.configService.get('DB_NAME'),
        })

        this._db = drizzle(this.pgPool, { schema })
    }

    get db(): NodePgDatabase<typeof schema> {
        return this._db
    }

    async onModuleInit() {
        // Test the database connection
        try {
            await this.pgPool.query('SELECT NOW()')
            console.log('Database connection established')
        } catch (error) {
            console.error('Database connection failed:', error)
            throw error
        }
    }

    async onModuleDestroy() {
        await this.pgPool.end()
    }
}
