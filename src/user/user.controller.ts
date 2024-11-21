import { Get, Controller } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}
    @Get()
    getAll() {
        return this.usersService.getAll()
    }
}
