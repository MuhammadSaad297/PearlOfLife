"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableOptions = void 0;
const TableOptions = (tableName, options = {}) => {
    const { paranoid } = options;
    const _options = {
        tableName: tableName,
        updatedAt: 'updated_on',
        createdAt: 'created_on',
        underscored: true,
        timestamps: false,
        ...options
    };
    if (paranoid) {
        return {
            ..._options,
            deletedAt: 'deleted_on'
        };
    }
    return _options;
};
exports.TableOptions = TableOptions;
//# sourceMappingURL=sequlize.utils.js.map