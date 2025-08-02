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
var KeyHolders_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../../../common/constants");
const paginated_model_provider_1 = require("../../../common/providers/paginated-model.provider");
const sequlize_utils_1 = require("../../../common/utils/sequlize.utils");
let KeyHolders = KeyHolders_1 = class KeyHolders extends paginated_model_provider_1.PaginatedModel {
    static scopes(scope = null) {
        const scopes = {
            list: {
                attributes: KeyHolders_1.attributes(),
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
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'street',
            'city',
            'state',
            'zip',
            'relation',
            'image_path',
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
], KeyHolders.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "phone_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "street", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "zip", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "relation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "image_path", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "token_url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "pin", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], KeyHolders.prototype, "created_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], KeyHolders.prototype, "updated_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "updated_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], KeyHolders.prototype, "deleted_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], KeyHolders.prototype, "deleted_by", void 0);
KeyHolders = KeyHolders_1 = __decorate([
    (0, sequelize_typescript_1.Table)((0, sequlize_utils_1.TableOptions)(constants_1.TABLES.KEY_HOLDERS, { paranoid: true })),
    (0, sequelize_typescript_1.Scopes)(() => KeyHolders.scopes())
], KeyHolders);
exports.default = KeyHolders;
//# sourceMappingURL=key-holders.entity.js.map