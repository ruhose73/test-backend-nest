"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const bcrypt = require("bcryptjs");
const token_service_1 = require("./token.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthService = class AuthService {
    constructor(tokenService, dataSource) {
        this.tokenService = tokenService;
        this.dataSource = dataSource;
    }
    async signin(dto) {
        try {
            const candidate = await this.dataSource.query('SELECT uid FROM users WHERE email = $1 OR nickname = $2', [dto.email, dto.nickname]);
            if (candidate.length > 0) {
                throw new common_1.HttpException('Пользователь с таким email или nickname уже существует', common_1.HttpStatus.BAD_REQUEST);
            }
            const userId = (0, uuid_1.v4)();
            const hashedPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.dataSource.query('INSERT INTO users (uid, email, password, nickname) VALUES ($1,$2,$3,$4) RETURNING uid, email, nickname', [userId, dto.email, hashedPassword, dto.nickname]);
            const token = this.tokenService.generateToken({ user });
            return token;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(dto) {
        try {
            const user = await this.dataSource.query('SELECT uid, email, password, nickname FROM users WHERE email = $1', [dto.email]);
            const isPassEquals = await bcrypt.compare(dto.password, user[0].password);
            if (!isPassEquals) {
                throw new common_1.HttpException('Неверные данные', common_1.HttpStatus.BAD_REQUEST);
            }
            const token = this.tokenService.generateToken({ user });
            return token;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logout(accessToken) {
        try {
            const userData = this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            return null;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async refresh(accessToken) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            const user = await this.dataSource.query('SELECT uid, email, password, nickname FROM users WHERE email = $1', [userData.user[0].email]);
            const token = this.tokenService.generateToken({ user });
            return token;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        typeorm_2.DataSource])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map