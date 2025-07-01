"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("@nestjs/config");
const users_entity_1 = require("../../modules/users/entities/users.entity");
const user_plans_entity_1 = require("../../modules/users/entities/user-plans.entity");
const notes_entity_1 = require("../../modules/notes/entities/notes.entity");
const memory_folders_entity_1 = require("../../modules/memories/entities/memory-folders.entity");
const memories_entity_1 = require("../../modules/memories/entities/memories.entity");
const key_holders_entity_1 = require("../../modules/key-holders/entities/key-holders.entity");
const image_folder_entity_1 = require("../../modules/image-upload/entities/image-folder.entity");
const image_details_entity_1 = require("../../modules/image-upload/entities/image-details.entity");
const image_categories_entity_1 = require("../../modules/image-upload/entities/image-categories.entity");
const credentials_entity_1 = require("../../modules/credentials/entities/credentials.entity");
const obituary_info_entity_1 = require("../../modules/obituary-info/entities/obituary-info.entity");
const Subscription_Plan_entity_1 = require("../../modules/payment/entities/Subscription-Plan.entity");
const user_subscription_entity_1 = require("../../modules/payment/entities/user-subscription.entity");
exports.databaseProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService) => {
            const host = configService.get('DB_HOST', 'localhost');
            const database = configService.get('DB_NAME', 'PearlsOfLife');
            const username = configService.get('DB_USERNAME', 'pearlsuser');
            const password = configService.get('DB_PASSWORD', '@Pearl123');
            const dialect = configService.get('DB_DIALECT', 'mssql');
            const port = parseInt(configService.get('DB_PORT', '1433'));
            console.log('Database connection config:', {
                host,
                database,
                username,
                port,
                dialect,
                password,
            });
            const sequelize = new sequelize_typescript_1.Sequelize({
                host: '192.168.100.80',
                database: 'PearlsOfLife',
                username: 'sa',
                password: 'pakistan1@',
                dialect: 'mssql',
                dialectOptions: {
                    options: {
                        encrypt: true,
                        trustServerCertificate: true,
                        enableArithAbort: true,
                        instanceName: 'SQLEXPRESS',
                        connectTimeout: 30000,
                        requestTimeout: 30000,
                    },
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 60000,
                    idle: 30000,
                },
                logging: console.log,
            });
            try {
                await sequelize.authenticate();
                console.log('✓ Database connection established successfully');
                sequelize.addModels([
                    users_entity_1.default,
                    user_plans_entity_1.default,
                    notes_entity_1.default,
                    memory_folders_entity_1.default,
                    memories_entity_1.default,
                    key_holders_entity_1.default,
                    image_folder_entity_1.default,
                    image_details_entity_1.default,
                    image_categories_entity_1.default,
                    credentials_entity_1.default,
                    obituary_info_entity_1.default,
                    Subscription_Plan_entity_1.SubscriptionPlan,
                    user_subscription_entity_1.UserSubscription,
                ]);
                await sequelize.sync({ force: false });
                console.log('✓ All models synchronized');
                return sequelize;
            }
            catch (error) {
                console.error('✗ Database connection or model initialization failed:', error);
                throw error;
            }
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=database.provider.js.map