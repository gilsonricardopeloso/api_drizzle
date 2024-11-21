import { Injectable } from '@nestjs/common'
import { DrizzleService } from '@/drizzle/drizzle.service'
import { users } from '@/drizzle/schema'

@Injectable()
export class UserService {
    constructor(private readonly drizzleService: DrizzleService) {}

    getAll() {
        return this.drizzleService.db.select().from(users)
    }
}
