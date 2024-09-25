"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.setViewEngine('hbs');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    const config = app.get(config_1.ConfigService);
    const port = config.get('SERVER_PORT');
    const nodeEnv = config.get('NODE_ENV');
    const basePath = config.get('BASEPATH');
    await app.listen(port, () => {
        logger.log(`🚀 Application is running on: ${basePath}:${port}/`);
        logger.log(`Running in mode: ${nodeEnv} `);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map