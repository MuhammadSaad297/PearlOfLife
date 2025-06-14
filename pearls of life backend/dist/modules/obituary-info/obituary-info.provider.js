"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obituaryInfoProvider = void 0;
const constants_1 = require("../../common/constants");
const obituary_info_entity_1 = require("./entities/obituary-info.entity");
exports.obituaryInfoProvider = [
    {
        provide: constants_1.TABLES.OBITUARY_INFO,
        useValue: obituary_info_entity_1.default,
    },
];
//# sourceMappingURL=obituary-info.provider.js.map