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
var UserPlans_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const users_entity_1 = require("./users.entity");
const constants_1 = require("../../../common/constants");
const sequlize_utils_1 = require("../../../common/utils/sequlize.utils");
let UserPlans = UserPlans_1 = class UserPlans extends sequelize_typescript_1.Model {
    static scopes(scope = null) {
        const scopes = {
            list: {
                attributes: UserPlans_1.attributes()
            },
            full360: {
                attributes: UserPlans_1.attributes(),
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
            'plan_id',
            'is_active',
            'created_on',
            'created_by',
            'updated_on',
            'updated_by'
        ];
    }
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4
    }),
    __metadata("design:type", String)
], UserPlans.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], UserPlans.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_entity_1.default, 'user_id'),
    __metadata("design:type", users_entity_1.default)
], UserPlans.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], UserPlans.prototype, "plan_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN
    }),
    __metadata("design:type", Boolean)
], UserPlans.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW
    }),
    __metadata("design:type", Date)
], UserPlans.prototype, "created_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], UserPlans.prototype, "created_by", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true
    }),
    __metadata("design:type", Date)
], UserPlans.prototype, "updated_on", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING
    }),
    __metadata("design:type", String)
], UserPlans.prototype, "updated_by", void 0);
UserPlans = UserPlans_1 = __decorate([
    (0, sequelize_typescript_1.Table)((0, sequlize_utils_1.TableOptions)(constants_1.TABLES.USERPLANS, { paranoid: false })),
    (0, sequelize_typescript_1.Scopes)(() => UserPlans.scopes())
], UserPlans);
exports.default = UserPlans;
//# sourceMappingURL=user-plans.entity.js.map