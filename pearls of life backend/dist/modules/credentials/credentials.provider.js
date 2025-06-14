"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialProvider = void 0;
const constants_1 = require("../../common/constants");
const credentials_entity_1 = require("./entities/credentials.entity");
exports.credentialProvider = [
    {
        provide: constants_1.TABLES.CREDENTIALS,
        useValue: credentials_entity_1.default
    }
];
//# sourceMappingURL=credentials.provider.js.map