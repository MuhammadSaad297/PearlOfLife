import { FindOptions, ScopeOptions } from "sequelize";
import { Model } from "sequelize-typescript";

export type PaginatedOptions = {
    page?: number;
    pageSize?: number;
    scopes?: string | ScopeOptions | (string | ScopeOptions)[];
    pagination?: boolean;
} & FindOptions;

export type PaginatedResult<I> = {
    data: I[];
    meta: {
        page: number;
        pageSize: number;
        total: number;
        pages: number;
    };
};

export class PaginatedModel<T> extends Model {
    static async paginate<T extends typeof PaginatedModel, I = InstanceType<T>>(
        this: T,
        {
            page = 1,
            pageSize = 100,
            pagination = true,
            ...params
        }: PaginatedOptions = {
            page: 1,
            pageSize: 100,
            pagination: true,
        }
    ): Promise<PaginatedResult<I>> {
        const options = Object.assign({},params);
        if(pagination == false){
            const scopes = params?.scopes || [];
            const rows = await this.scope(scopes).findAll(options);
            return {
                meta: {
                    page: 1,
                    pageSize: rows.length,
                    total: rows.length,
                    pages: 1
                },
                data: rows as unknown as I[]
            };
        } else {
            const scopes = params?.scopes || [];
            const countOptions = Object.keys(options).reduce((acc, key) => {
                if(!['order', 'attributes'].includes(key)){
                    acc[key] = options[key];
                }
                return acc;
            }, {});

            options.limit = pageSize;
            options.offset = pageSize * (page - 1);
            
            if(params.limit) console.warn('(sequelize-pagination) Warning: limit option is ignored');
            if(params.offset) console.warn('(sequelize-pagination) Warning: offset option is ignored');
            
            if(params.order) options.order = params.order;
            
            let count: any = 0, rows = [];
            [count, rows] = await Promise.all([
                this.scope(scopes).findAll(countOptions),
                this.scope(scopes).findAll(options)
            ]);

            const total = options.group !== undefined ? count['length']: count?.length;
            const typedRows = rows as unknown as I[];
            const pages = Math.ceil(total/pageSize);
            
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