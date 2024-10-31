import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/node-postgres'
//import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'
import * as schema from './schema'
//import { seed } from './seed'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
    private _db: ReturnType<typeof drizzle>
    private pool: Pool

    constructor(private configService: ConfigService) {}

    async onModuleInit() {
        this.pool = new Pool({
            connectionString: this.configService.get<string>('DATABASE_URL'),
        })

        this._db = drizzle(this.pool, { schema })

        // Run seed
        //await seed(this, this.configService)
    }

    async onModuleDestroy() {
        await this.pool.end()
    }

    get db(): ReturnType<typeof drizzle> {
        return this._db
    }
}
