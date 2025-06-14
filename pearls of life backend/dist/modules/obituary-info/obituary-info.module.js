"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObituaryInfoModule = void 0;
const common_1 = require("@nestjs/common");
const obituary_info_controller_1 = require("./obituary-info.controller");
const obituary_info_service_1 = require("./obituary-info.service");
const obituary_info_provider_1 = require("./obituary-info.provider");
let ObituaryInfoModule = class ObituaryInfoModule {
};
exports.ObituaryInfoModule = ObituaryInfoModule;
exports.ObituaryInfoModule = ObituaryInfoModule = __decorate([
    (0, common_1.Module)({
        controllers: [obituary_info_controller_1.ObituaryInfoController],
        providers: [obituary_info_service_1.ObituaryInfoService, ...obituary_info_provider_1.obituaryInfoProvider],
    })
], ObituaryInfoModule);
//# sourceMappingURL=obituary-info.module.js.map