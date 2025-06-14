"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("./common/config/config.module");
const database_module_1 = require("./core/database/database.module");
const users_module_1 = require("./modules/users/users.module");
const notes_module_1 = require("./modules/notes/notes.module");
const auth_module_1 = require("./modules/auth/auth.module");
const credentials_module_1 = require("./modules/credentials/credentials.module");
const personal_info_module_1 = require("./modules/personal-info/personal-info.module");
const image_upload_module_1 = require("./modules/image-upload/image-upload.module");
const key_holders_module_1 = require("./modules/key-holders/key-holders.module");
const memories_module_1 = require("./modules/memories/memories.module");
const obituary_info_module_1 = require("./modules/obituary-info/obituary-info.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            database_module_1.DataBaseModule,
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => notes_module_1.NotesModule),
            (0, common_1.forwardRef)(() => personal_info_module_1.PersonalInfoModule),
            (0, common_1.forwardRef)(() => credentials_module_1.CredentialsModule),
            (0, common_1.forwardRef)(() => image_upload_module_1.ImageUploadModule),
            (0, common_1.forwardRef)(() => key_holders_module_1.KeyHoldersModule),
            (0, common_1.forwardRef)(() => memories_module_1.MemoriesModule),
            (0, common_1.forwardRef)(() => obituary_info_module_1.ObituaryInfoModule),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map