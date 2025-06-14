"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyHolderProvider = void 0;
const constants_1 = require("../../common/constants");
const key_holders_entity_1 = require("./entities/key-holders.entity");
exports.keyHolderProvider = [
    {
        provide: constants_1.TABLES.KEY_HOLDERS,
        useValue: key_holders_entity_1.default
    }
];
//# sourceMappingURL=key-holders.provider.js.map