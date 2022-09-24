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
exports.GetUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tags_dto_1 = require("../../tag/dto/tags.dto");
class GetUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: `mail@mail.com`, description: `Почтовый адрес` }),
    __metadata("design:type", String)
], GetUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: `ruhose73`, description: `Псевдоним пользователя` }),
    __metadata("design:type", String)
], GetUserDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [tags_dto_1.TagsDto] }),
    __metadata("design:type", Array)
], GetUserDto.prototype, "tags", void 0);
exports.GetUserDto = GetUserDto;
//# sourceMappingURL=getUser.dto.js.map