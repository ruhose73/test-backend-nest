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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../auth/token.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(tokenService, dataSource) {
        this.tokenService = tokenService;
        this.dataSource = dataSource;
    }
    async getUser(accessToken) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            const user = await this.dataSource.query('SELECT email, nickname FROM users WHERE uid = $1', [userData.user[0].uid]);
            const tags = await this.dataSource.query('SELECT id, name, sortorder FROM tags WHERE creator = $1', [userData.user[0].uid]);
            user[0].tags = tags;
            console.log(user[0]);
            return user[0];
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async putUser(dto) {
        try {
            const candidate = await this.dataSource.query('SELECT uid FROM users WHERE email = $1 OR nickname = $2', [dto.email, dto.nickname]);
            if (candidate.length > 0) {
                throw new common_1.HttpException('Такой пользователь уже существует', common_1.HttpStatus.BAD_REQUEST);
            }
            const userId = (0, uuid_1.v4)();
            const hashedPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.dataSource.query('INSERT INTO users (uid, email, password, nickname) VALUES ($1,$2,$3,$4) RETURNING uid, email, nickname', [userId, dto.email, hashedPassword, dto.nickname]);
            return user[0];
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(accessToken) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.dataSource.query('DELETE FROM users WHERE uid = $1', [
                userData.user[0].uid,
            ]);
            throw new common_1.HttpException('', common_1.HttpStatus.NO_CONTENT);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async userTag(accessToken, tags) {
        const userData = await this.tokenService.validateAccessToken(accessToken);
        if (!userData) {
            throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
        }
        const data = [];
        const buffer = new ArrayBuffer(16);
        const uint8 = new Uint8Array(buffer);
        for (let i = 0; i < tags.tags.length; i++) {
            const checkTag = await this.dataSource.query('SELECT id, name, sortorder FROM tags WHERE id = $1', [tags.tags[i]]);
            if (!checkTag[0]) {
                throw new common_1.HttpException('Тег не найден', common_1.HttpStatus.BAD_REQUEST);
            }
            Atomics.store(uint8, i, tags.tags[i]);
            const updateTag = await this.dataSource.query('UPDATE tags SET creator = COALESCE($1, creator) ' +
                'WHERE id = $2 RETURNING id, name, sortorder', [userData.uid, Atomics.load(uint8, i)]);
            await this.dataSource.query('UPDATE usertags SET creatorid = COALESCE($1, creatorid) ' +
                'WHERE tagid = $2', [userData.uid, Atomics.load(uint8, i)]);
            const tag = updateTag[0];
            data.push(tag);
        }
        return { tags: data };
    }
    async deleteTag(accessToken, tagId) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.dataSource.query('DELETE FROM tags WHERE id = $1 AND creator = $2', [tagId, userData.user[0].uid]);
            const tagsFullInfo = await this.dataSource.query('SELECT id, name, sortorder FROM tags WHERE creator = $1 ', [userData.user[0].uid]);
            return tagsFullInfo;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async myTags(accessToken) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            const tagsFullInfo = await this.dataSource.query('SELECT id,name,sortorder FROM tags WHERE creator = $1', [userData.user[0].uid]);
            return tagsFullInfo;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        typeorm_2.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map