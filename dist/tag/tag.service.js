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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("../auth/token.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_dto_1 = require("./dto/tag.dto");
const creator_dto_1 = require("./dto/creator.dto");
const meta_dto_1 = require("./dto/meta.dto");
let TagService = class TagService {
    constructor(tokenService, dataSource) {
        this.tokenService = tokenService;
        this.dataSource = dataSource;
    }
    async createTag(accessToken, tagDto) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            const candidate = await this.dataSource.query('SELECT id FROM tags WHERE name = $1', [tagDto.name]);
            if (candidate.length > 0) {
                throw new common_1.HttpException('Такой тег уже существует', common_1.HttpStatus.BAD_REQUEST);
            }
            const tag = await this.dataSource.query('INSERT INTO tags (creator, name, sortorder) VALUES ($1,$2,$3) RETURNING id, name, sortorder', [userData.user[0].uid, tagDto.name, tagDto.sortOrder]);
            await this.dataSource.query('INSERT INTO usertags (creatorid, tagid) VALUES ($1,$2)', [userData.user[0].uid, tag[0].id]);
            return tag[0];
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTagById(tagId) {
        try {
            const tagFullInfo = await this.dataSource.query('SELECT tags.id, tags.creator, tags.name, tags.sortOrder, users.nickname, users.uid ' +
                'FROM tags LEFT OUTER JOIN users on tags.creator = users.uid WHERE tags.id = $1', [tagId]);
            const tag = new tag_dto_1.default(tagFullInfo[0]);
            const creator = new creator_dto_1.default(tagFullInfo[0]);
            return Object.assign({ creator }, tag);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateTag(tagId, accessToken, name, sortorder) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.dataSource.query('UPDATE tags SET name = COALESCE($1, name), sortorder = COALESCE($2, sortorder) ' +
                'WHERE id = $3 AND creator = $4', [name.name, sortorder.sortorder, tagId, userData.user[0].uid]);
            const tagFullInfo = await this.dataSource.query('SELECT tags.id, tags.creator, tags.name, tags.sortOrder, users.nickname, users.uid ' +
                'FROM tags LEFT OUTER JOIN users on tags.creator = users.uid WHERE tags.id = $1', [tagId]);
            const creator = new creator_dto_1.default(tagFullInfo[0]);
            const tag = new tag_dto_1.default(tagFullInfo[0]);
            return Object.assign({ creator }, tag);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTag(accessToken, tagId) {
        try {
            const userData = await this.tokenService.validateAccessToken(accessToken);
            if (!userData) {
                throw new common_1.HttpException('Вы не авторизованы', common_1.HttpStatus.UNAUTHORIZED);
            }
            await this.dataSource.query('DELETE FROM tags WHERE id = $1 AND creator = $2', [tagId, userData.user[0].uid]);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async allTags(inputParams) {
        try {
            const tagsFullInfo = await this.dataSource.query(`SELECT tags.id, tags.creator, tags.name, tags.sortorder, users.nickname, users.uid ` +
                `FROM tags LEFT OUTER JOIN users on tags.creator = users.uid` +
                ` ORDER BY (${inputParams.sortByOrder == true
                    ? 'sortorder'
                    : inputParams.sortByName == true
                        ? 'name'
                        : 'id'}) LIMIT $1 OFFSET $2`, [inputParams.length, inputParams.offset]);
            const data = [];
            tagsFullInfo.forEach((element) => {
                const creator = new creator_dto_1.default(element);
                const tag = new tag_dto_1.default(element);
                data.push(Object.assign({ creator }, tag));
            });
            const countTags = await this.dataSource.query(`SELECT COUNT(*) FROM tags`);
            const meta = new meta_dto_1.default({
                offset: inputParams.offset,
                length: inputParams.length,
                quantity: countTags[0].count,
            });
            return { data, meta };
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        typeorm_2.DataSource])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map