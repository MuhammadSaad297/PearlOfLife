"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("./multer.config");
let MulterModule = class MulterModule {
};
exports.MulterModule = MulterModule;
exports.MulterModule = MulterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register(multer_config_1.multerConfig)
        ],
        exports: [platform_express_1.MulterModule]
    })
], MulterModule);
//# sourceMappingURL=multer.module.js.map