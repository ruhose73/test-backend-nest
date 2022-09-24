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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tag_service_1 = require("./tag.service");
const tagInput_dto_1 = require("./dto/tagInput.dto");
const tags_dto_1 = require("./dto/tags.dto");
const tag_dto_1 = require("./dto/tag.dto");
const tagWithCreator_dto_1 = require("./dto/tagWithCreator.dto");
const getAllTags_dto_1 = require("./dto/getAllTags.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const validation_pipe_1 = require("../pipes/validation.pipe");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    createTag(req, tagDto) {
        const token = req.headers.authorization.split(' ')[1];
        return this.tagService.createTag(token, tagDto);
    }
    getTagById(id) {
        return this.tagService.getTagById(id);
    }
    updateTag(req, id) {
        const token = req.headers.authorization.split(' ')[1];
        return this.tagService.updateTag(id, token, { name: req.body.name ? req.body.name : null }, { sortorder: req.body.sortOrder ? req.body.sortOrder : null });
    }
    deleteTag(req, id) {
        const token = req.headers.authorization.split(' ')[1];
        return this.tagService.deleteTag(token, id);
    }
    allTags(req) {
        return this.tagService.allTags({
            sortByOrder: req.query.sortByOrder == '' ? true : false,
            offset: req.query.offset ? req.query.offset : 0,
            sortByName: req.query.sortByName == '' ? true : false,
            length: req.query.length ? req.query.length : 10,
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Создание тега` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiBody)({ type: tag_dto_1.default }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tags_dto_1.TagsDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/tag'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tagInput_dto_1.TagInputDto]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "createTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Получение тега по ID` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Идентификатор тега',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tagWithCreator_dto_1.TagWithCreatorDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/tag/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "getTagById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Обновление тега по ID` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Идентификатор тега',
    }),
    (0, swagger_1.ApiBody)({ type: tag_dto_1.default }),
    (0, swagger_1.ApiResponse)({ status: 200, type: tagWithCreator_dto_1.TagWithCreatorDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/tag/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "updateTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Удаление тега по ID` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Идентификатор тега',
    }),
    (0, swagger_1.ApiResponse)({ status: 204, description: `NO_CONTENT` }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/tag/:id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "deleteTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Получение всех тегов` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiQuery)({ name: 'sortByOrder', description: `Сортировка order` }),
    (0, swagger_1.ApiQuery)({ name: 'offset', description: `Сдвиг по элементам` }),
    (0, swagger_1.ApiQuery)({ name: 'sortByName', description: `Сортировка name` }),
    (0, swagger_1.ApiQuery)({ name: 'length', description: `Количество элементов` }),
    (0, swagger_1.ApiResponse)({ status: 200, type: getAllTags_dto_1.GetAllTagsDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/tag'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagController.prototype, "allTags", null);
TagController = __decorate([
    (0, swagger_1.ApiTags)(`Теги`),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
exports.TagController = TagController;
//# sourceMappingURL=tag.controller.js.map