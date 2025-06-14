"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProvider = void 0;
const constants_1 = require("../../common/constants");
const users_entity_1 = require("./entities/users.entity");
const user_plans_entity_1 = require("./entities/user-plans.entity");
exports.usersProvider = [
    {
        provide: constants_1.TABLES.USERS,
        useValue: users_entity_1.default
    },
    {
        provide: constants_1.TABLES.USERPLANS,
        useValue: user_plans_entity_1.default
    }
];
//# sourceMappingURL=users.provider.js.map