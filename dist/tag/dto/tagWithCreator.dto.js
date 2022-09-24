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
exports.TagWithCreatorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const creator_dto_1 = require("./creator.dto");
class TagWithCreatorDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: creator_dto_1.default }),
    __metadata("design:type", Object)
], TagWithCreatorDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'тег номер 1 ', description: `Название тега` }),
    __metadata("design:type", String)
], TagWithCreatorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: `Вариант сортировки` }),
    __metadata("design:type", Number)
], TagWithCreatorDto.prototype, "sortOrder", void 0);
exports.TagWithCreatorDto = TagWithCreatorDto;
//# sourceMappingURL=tagWithCreator.dto.js.map