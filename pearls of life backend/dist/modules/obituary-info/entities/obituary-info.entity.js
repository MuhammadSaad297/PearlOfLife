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
var ObituaryInfo_1;
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../../../common/constants");
const paginated_model_provider_1 = require("../../../common/providers/paginated-model.provider");
const sequlize_utils_1 = require("../../../common/utils/sequlize.utils");
let ObituaryInfo = ObituaryInfo_1 = class ObituaryInfo extends paginated_model_provider_1.PaginatedModel {
    static scopes(scope = null) {
        const scopes = {
            list: {
                attributes: ObituaryInfo_1.attributes(),
            },
        };
        if (scope) {
            return scopes[scope] || {};
        }
        return scopes;
    }
    static attributes() {
        return [
            'id',
            'user_id',
            'birth_name',
            'married_name',
            'current_name',
            'birth_date',
            'birth_place',
            'parent_names',
            'spouse_name',
            'children',
            'siblings',
            'created_on',
            'created_by',
            'updated_by',
            'updated_on',
        ];
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "birth_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "married_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "current_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
    }),
    __metadata("design:type", Date)
], ObituaryInfo.prototype, "birth_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "birth_place", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "parent_names", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "spouse_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(class_validator_1.MAX),
        get() {
            const rawValue = this.getDataValue('children');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('children', JSON.stringify(value));
        },
    }),
    __metadata("design:type", Array)
], ObituaryInfo.prototype, "children", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(class_validator_1.MAX),
        get() {
            const rawValue = this.getDataValue('siblings');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('siblings', JSON.stringify(value));
        },
    }),
    __metadata("design:type", Array)
], ObituaryInfo.prototype, "siblings", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], ObituaryInfo.prototype, "created_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], ObituaryInfo.prototype, "updated_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "updated_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], ObituaryInfo.prototype, "deleted_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], ObituaryInfo.prototype, "deleted_by", void 0);
ObituaryInfo = ObituaryInfo_1 = __decorate([
    (0, sequelize_typescript_1.Table)((0, sequlize_utils_1.TableOptions)(constants_1.TABLES.OBITUARY_INFO, { paranoid: true })),
    (0, sequelize_typescript_1.Scopes)(() => ObituaryInfo.scopes())
], ObituaryInfo);
exports.default = ObituaryInfo;
//# sourceMappingURL=obituary-info.entity.js.map