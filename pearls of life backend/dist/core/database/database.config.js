"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const db_config_1 = require("../../common/config/db.config");
const connection = db_config_1.DB_CONFIG;
exports.databaseConfig = {
    development: connection,
    test: connection,
    production: connection,
};
module.exports = exports.databaseConfig;
//# sourceMappingURL=database.config.js.map