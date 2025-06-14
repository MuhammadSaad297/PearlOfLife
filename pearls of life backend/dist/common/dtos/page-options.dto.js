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
exports.PageOptionsDto = void 0;
const class_validator_1 = require("class-validator");
const constants_1 = require("../constants");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PageOptionsDto {
    constructor() {
        this.order = constants_1.ORDER.DESC;
        this.search = '';
        this.page = 1;
        this.pageSize = 20;
        this.pagination = true;
    }
}
exports.PageOptionsDto = PageOptionsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: constants_1.ORDER,
        default: constants_1.ORDER.DESC
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.ORDER),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: 'updated_on'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "order_key", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        default: ''
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 1
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        minimum: 1,
        default: 20,
        maximum: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        default: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => ['true', true, 1].includes(value)),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PageOptionsDto.prototype, "pagination", void 0);
//# sourceMappingURL=page-options.dto.js.map