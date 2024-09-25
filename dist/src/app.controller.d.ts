import { I18nContext } from 'nestjs-i18n';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    render(): {
        message: string;
    };
    getI18nHello(i18n: I18nContext): string;
}
