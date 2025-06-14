"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const users_module_1 = require("../users/users.module");
const helpers_module_1 = require("../../common/helpers/helpers.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const email_module_1 = require("../email/email.module");
const key_holders_module_1 = require("../key-holders/key-holders.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', isGlobal: true }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT.SECRET'),
                    algorithm: configService.get('JWT.ALGORITHM'),
                    signOptions: {
                        algorithm: configService.get('JWT.ALGORITHM'),
                        expiresIn: `${configService.get('JWT.ACCESS_TOKEN_EXPIRY')}s`
                    }
                }),
                inject: [config_1.ConfigService]
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => helpers_module_1.HelperModule),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule),
            (0, common_1.forwardRef)(() => key_holders_module_1.KeyHoldersModule)
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map