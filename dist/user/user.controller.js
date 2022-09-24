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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const CreateUser_dto_1 = require("../auth/dto/CreateUser.dto");
const getUser_dto_1 = require("./dto/getUser.dto");
const user_dto_1 = require("./dto/user.dto");
const tagsIdArray_dto_1 = require("../tag/dto/tagsIdArray.dto");
const myUserTags_dto_1 = require("./dto/myUserTags.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const validation_pipe_1 = require("../pipes/validation.pipe");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.getUser(token);
    }
    putUser(userDto) {
        return this.userService.putUser(userDto);
    }
    deleteUser(req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.deleteUser(token);
    }
    userTags(req, tags) {
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.userTag(token, tags);
    }
    deleteTag(req, id) {
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.deleteTag(token, id);
    }
    myTags(req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.userService.myTags(token);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Получить пользователя (себя)` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: getUser_dto_1.GetUserDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Создать пользователя` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_dto_1.UserDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Put)('/user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "putUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Удалить пользователя (себя)` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: `NO_CONTENT` }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Добавить теги к пользователю` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiBody)({ type: tagsIdArray_dto_1.TagsIdArrayDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: myUserTags_dto_1.MyUserTagsDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('user/tag'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userTags", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Удалить тег пользователя` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Идентификатор тега',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: myUserTags_dto_1.MyUserTagsDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/user/tag/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteTag", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Получить свои теги` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: myUserTags_dto_1.MyUserTagsDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/user/tag/my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myTags", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)(`Пользователи`),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map