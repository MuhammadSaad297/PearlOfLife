"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyHoldersModule = void 0;
const common_1 = require("@nestjs/common");
const key_holders_service_1 = require("./key-holders.service");
const key_holders_controller_1 = require("./key-holders.controller");
const key_holders_provider_1 = require("./key-holders.provider");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const email_module_1 = require("../email/email.module");
const users_module_1 = require("../users/users.module");
let KeyHoldersModule = class KeyHoldersModule {
};
exports.KeyHoldersModule = KeyHoldersModule;
exports.KeyHoldersModule = KeyHoldersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../..', 'uploads'),
                serveRoot: '/uploads',
                renderPath: ''
            }),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => email_module_1.EmailModule)
        ],
        providers: [
            key_holders_service_1.KeyHoldersService,
            ...key_holders_provider_1.keyHolderProvider
        ],
        controllers: [key_holders_controller_1.KeyHoldersController],
        exports: [key_holders_service_1.KeyHoldersService]
    })
], KeyHoldersModule);
//# sourceMappingURL=key-holders.module.js.map