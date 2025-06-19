"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const payments_controller_1 = require("./payments.controller");
const payments_service_1 = require("./payments.service");
const subscription_plan_model_1 = require("./models/subscription-plan.model");
const user_subscription_model_1 = require("./models/user-subscription.model");
const subscription_service_1 = require("./subscription.service");
const database_module_1 = require("../../core/database/database.module");
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DataBaseModule,
            sequelize_1.SequelizeModule.forFeature([subscription_plan_model_1.SubscriptionPlan, user_subscription_model_1.UserSubscription]),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async () => ({
                    dialect: 'mssql',
                    host: 'localhost',
                    port: 1433,
                    username: 'sa',
                    password: 'bnmbnm',
                    database: 'PearlsOfLife',
                    models: [subscription_plan_model_1.SubscriptionPlan, user_subscription_model_1.UserSubscription],
                    dialectOptions: {
                        options: {
                            encrypt: false,
                            trustServerCertificate: true,
                            enableArithAbort: true,
                            instanceName: 'SQLEXPRESS',
                        },
                    },
                }),
            }),
        ],
        controllers: [payments_controller_1.PaymentsController],
        providers: [payments_service_1.PaymentsService, subscription_service_1.SubscriptionService],
        exports: [payments_service_1.PaymentsService, subscription_service_1.SubscriptionService],
    })
], PaymentsModule);
//# sourceMappingURL=payments.module.js.map