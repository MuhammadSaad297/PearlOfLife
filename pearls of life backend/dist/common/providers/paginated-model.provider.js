"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
class PaginatedModel extends sequelize_typescript_1.Model {
    static async paginate({ page = 1, pageSize = 100, pagination = true, ...params } = {
        page: 1,
        pageSize: 100,
        pagination: true,
    }) {
        const options = Object.assign({}, params);
        if (pagination == false) {
            const scopes = params?.scopes || [];
            const rows = await this.scope(scopes).findAll(options);
            return {
                meta: {
                    page: 1,
                    pageSize: rows.length,
                    total: rows.length,
                    pages: 1
                },
                data: rows
            };
        }
        else {
            const scopes = params?.scopes || [];
            const countOptions = Object.keys(options).reduce((acc, key) => {
                if (!['order', 'attributes'].includes(key)) {
                    acc[key] = options[key];
                }
                return acc;
            }, {});
            options.limit = pageSize;
            options.offset = pageSize * (page - 1);
            if (params.limit)
                console.warn('(sequelize-pagination) Warning: limit option is ignored');
            if (params.offset)
                console.warn('(sequelize-pagination) Warning: offset option is ignored');
            if (params.order)
                options.order = params.order;
            let count = 0, rows = [];
            [count, rows] = await Promise.all([
                this.scope(scopes).findAll(countOptions),
                this.scope(scopes).findAll(options)
            ]);
            const total = options.group !== undefined ? count['length'] : count?.length;
            const typedRows = rows;
            const pages = Math.ceil(total / pageSize);
            return {
                meta: {
                    page,
                    pageSize,
                    total,
                    pages
                },
                data: typedRows
            };
        }
    }
}
exports.PaginatedModel = PaginatedModel;
//# sourceMappingURL=paginated-model.provider.js.map