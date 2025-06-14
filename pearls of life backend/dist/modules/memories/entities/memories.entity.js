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
var Memories_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("../../../common/constants");
const paginated_model_provider_1 = require("../../../common/providers/paginated-model.provider");
const sequlize_utils_1 = require("../../../common/utils/sequlize.utils");
const memory_folders_entity_1 = require("./memory-folders.entity");
const users_entity_1 = require("../../users/entities/users.entity");
const image_details_entity_1 = require("../../image-upload/entities/image-details.entity");
let Memories = Memories_1 = class Memories extends paginated_model_provider_1.PaginatedModel {
    static scopes(scope = null) {
        const scopes = {
            list: {
                attributes: Memories_1.attributes()
            },
            full360: {
                attributes: Memories_1.attributes(),
                include: [
                    {
                        model: memory_folders_entity_1.default,
                        attributes: memory_folders_entity_1.default.attributes(),
                        as: 'folder',
                    },
                    {
                        model: image_details_entity_1.default,
                        attributes: image_details_entity_1.default.attributes(),
                        as: 'image_details',
                    }
                ]
            }
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
            'folder_id',
            'image_details_id',
            'memory_date',
            'description',
            'created_on',
            'created_by',
            'updated_by',
            'updated_on'
        ];
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false
    }),
    __metadata("design:type", String)
], Memories.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], Memories.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => memory_folders_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], Memories.prototype, "folder_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => memory_folders_entity_1.default, 'folder_id'),
    __metadata("design:type", memory_folders_entity_1.default)
], Memories.prototype, "folder", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => image_details_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false
    }),
    __metadata("design:type", Object)
], Memories.prototype, "image_details_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => image_details_entity_1.default, 'image_details_id'),
    __metadata("design:type", image_details_entity_1.default)
], Memories.prototype, "image_details", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], Memories.prototype, "memory_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], Memories.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], Memories.prototype, "created_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], Memories.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], Memories.prototype, "updated_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], Memories.prototype, "updated_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], Memories.prototype, "deleted_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], Memories.prototype, "deleted_by", void 0);
Memories = Memories_1 = __decorate([
    (0, sequelize_typescript_1.Table)((0, sequlize_utils_1.TableOptions)(constants_1.TABLES.MEMORIES, { paranoid: true })),
    (0, sequelize_typescript_1.Scopes)(() => Memories.scopes())
], Memories);
exports.default = Memories;
//# sourceMappingURL=memories.entity.js.map