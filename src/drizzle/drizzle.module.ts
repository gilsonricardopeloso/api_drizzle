// src/drizzle/drizzle.module.ts
import { Module, Global } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DrizzleService } from './drizzle.service'

@Global()
@Module({
    providers: [DrizzleService],
    exports: [DrizzleService],
})
export class DrizzleModule {}
