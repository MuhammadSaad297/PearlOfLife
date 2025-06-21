"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("../../../common/constants");
const app_config_1 = require("./../../../common/config/app.config");
const config = (0, app_config_1.default)();
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return (request.headers?.[constants_1.X_ACCESS_TOKEN] ||
                        request.headers?.[constants_1.X_ACCESS_TOKEN.toLocaleLowerCase()] ||
                        request.query?.[constants_1.X_ACCESS_TOKEN.toLocaleLowerCase()])?.replace(`${constants_1.BEARER} `, '');
                },
            ]),
            ignoreExpiration: false,
            algorithm: config.JWT.ALGORITHM,
            secretOrKey: config.JWT.SECRET,
        });
    }
    async validate(payload) {
        return {
            user_id: payload.user_id,
            session_id: payload.session_id,
            version: payload.version,
            is_keyholder: payload?.is_keyholder ?? false,
            role: payload?.role ?? 'user',
        };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map