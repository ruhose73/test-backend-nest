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
exports.GetAllTagsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tagWithCreator_dto_1 = require("./tagWithCreator.dto");
const meta_dto_1 = require("./meta.dto");
class GetAllTagsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [tagWithCreator_dto_1.TagWithCreatorDto] }),
    __metadata("design:type", Array)
], GetAllTagsDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: meta_dto_1.default }),
    __metadata("design:type", Object)
], GetAllTagsDto.prototype, "meta", void 0);
exports.GetAllTagsDto = GetAllTagsDto;
//# sourceMappingURL=getAllTags.dto.js.map