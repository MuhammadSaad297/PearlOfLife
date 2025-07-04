"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalInfoModule = void 0;
const common_1 = require("@nestjs/common");
const personal_info_controller_1 = require("./personal-info.controller");
const users_module_1 = require("../users/users.module");
const image_upload_module_1 = require("../image-upload/image-upload.module");
let PersonalInfoModule = class PersonalInfoModule {
};
exports.PersonalInfoModule = PersonalInfoModule;
exports.PersonalInfoModule = PersonalInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            image_upload_module_1.ImageUploadModule
        ],
        controllers: [personal_info_controller_1.PersonalInfoController]
    })
], PersonalInfoModule);
//# sourceMappingURL=personal-info.module.js.map