import { Controller, Get, Render } from '@nestjs/common'
import { I18n, I18nContext } from 'nestjs-i18n'
import { AppService } from '@/app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    render() {
        const message = this.appService.getHello()
        return { message }
    }

    @Get('/hello')
    getI18nHello(@I18n() i18n: I18nContext) {
        return i18n.t('webxnet.Hello')
    }
}
