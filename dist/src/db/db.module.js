"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const schema = require("../schema");
const config_1 = require("@nestjs/config");
let DbModule = class DbModule {
};
exports.DbModule = DbModule;
exports.DbModule = DbModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'DB',
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const pool = new pg_1.Pool({
                        host: configService.get('DB_HOST'),
                        user: configService.get('DB_USER'),
                        password: configService.get('DB_PASS'),
                        database: configService.get('DB_NAME'),
                        port: configService.get('DB_PORT'),
                    });
                    return (0, node_postgres_1.drizzle)(pool, { schema });
                },
            },
        ],
        exports: ['DB'],
    })
], DbModule);
//# sourceMappingURL=db.module.js.map