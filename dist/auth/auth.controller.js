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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("./dto/CreateUser.dto");
const auth_service_1 = require("./auth.service");
const LoginUser_dto_1 = require("./dto/LoginUser.dto");
const swagger_1 = require("@nestjs/swagger");
const Token_dto_1 = require("./dto/Token.dto");
const validation_pipe_1 = require("../pipes/validation.pipe");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signin(userDto) {
        return this.authService.signin(userDto);
    }
    login(userDto) {
        return this.authService.login(userDto);
    }
    logout(req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.authService.logout(token);
    }
    refresh(req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.authService.refresh(token);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Создание пользователя` }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Token_dto_1.TokenDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Авторизация` }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Token_dto_1.TokenDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Выход из учетной записи` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: `NO_CONTENT` }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 403, description: `UNAUTHORIZED` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: `Обновление токена` }),
    (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: 'Auth token',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Token_dto_1.TokenDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: `BAD_REQUEST` }),
    (0, swagger_1.ApiResponse)({ status: 403, description: `UNAUTHORIZED` }),
    (0, swagger_1.ApiResponse)({ status: 500, description: `INTERNAL_SERVER_ERROR` }),
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)(`Авторизация`),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map