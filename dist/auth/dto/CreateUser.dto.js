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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: `mail@mail.com`, description: `Почтовый адрес` }),
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Некорректный email' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, class_validator_1.Length)(8, 32, { message: 'Пароль не меньше 8 символов' }),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
        message: 'password too weak',
    }),
    (0, swagger_1.ApiProperty)({ example: `Misha!234`, description: `Пароль пользователя` }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Должно быть строкой' }),
    (0, swagger_1.ApiProperty)({ example: `ruhose73`, description: `Псевдоним пользователя` }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "nickname", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=CreateUser.dto.js.map