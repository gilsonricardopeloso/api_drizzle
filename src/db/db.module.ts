import { Module } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../schema'
import { ConfigService } from '@nestjs/config'

@Module({
    providers: [
        {
            provide: 'DB',
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const pool = new Pool({
                    host: configService.get<string>('DB_HOST'),
                    user: configService.get<string>('DB_USER'),
                    password: configService.get<string>('DB_PASS'),
                    database: configService.get<string>('DB_NAME'),
                    port: configService.get<number>('DB_PORT'),
                })
                return drizzle<typeof schema>(pool, { schema })
            },
        },
    ],
    exports: ['DB'],
})
export class DbModule {}
