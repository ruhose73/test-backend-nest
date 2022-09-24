"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
class JwtAuthGuard {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            if (!userData) {
                throw new common_1.UnauthorizedException({
                    message: 'Пользователь не авторизован',
                });
            }
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException({
                message: 'Пользователь не авторизован',
            });
        }
    }
}
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth-guard.js.map