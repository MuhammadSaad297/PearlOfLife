"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGraud = void 0;
const passport_1 = require("@nestjs/passport");
class AuthGraud extends (0, passport_1.AuthGuard)('jwt') {
}
exports.AuthGraud = AuthGraud;
//# sourceMappingURL=auth.guard.js.map