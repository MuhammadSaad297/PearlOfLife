"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelper = void 0;
const common_1 = require("@nestjs/common");
const app_config_1 = require("./../config/app.config");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const config = (0, app_config_1.default)();
const jwt = new jwt_1.JwtService({ secret: config.JWT.SECRET });
let JwtHelper = class JwtHelper {
    generateToken(user_id, is_keyholder = false, role = 'user', session_id = (0, crypto_1.randomUUID)()) {
        const payload = {
            user_id,
            session_id,
            version: 1,
            is_keyholder,
            role,
        };
        const access_token = jwt.sign(payload, {
            secret: config.JWT.SECRET,
            expiresIn: config.JWT.ACCESS_TOKEN_EXPIRY,
        });
        return {
            access_token,
        };
    }
};
exports.JwtHelper = JwtHelper;
exports.JwtHelper = JwtHelper = __decorate([
    (0, common_1.Injectable)()
], JwtHelper);
//# sourceMappingURL=jwt-helper.js.map