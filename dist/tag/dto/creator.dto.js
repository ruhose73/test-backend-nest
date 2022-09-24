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
const swagger_1 = require("@nestjs/swagger");
class CreatorDto {
    constructor(tagFullInfoElement) {
        this.nickname = tagFullInfoElement.nickname;
        this.uid = tagFullInfoElement.uid;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: `ruhose73`, description: `Псевдоним пользователя` }),
    __metadata("design:type", String)
], CreatorDto.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: `wRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
        description: `UUID пользователя`,
    }),
    __metadata("design:type", String)
], CreatorDto.prototype, "uid", void 0);
exports.default = CreatorDto;
//# sourceMappingURL=creator.dto.js.map