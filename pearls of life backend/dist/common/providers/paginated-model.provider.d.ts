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
export declare class PaginatedModel<T> extends Model {
    static paginate<T extends typeof PaginatedModel, I = InstanceType<T>>(this: T, { page, pageSize, pagination, ...params }?: PaginatedOptions): Promise<PaginatedResult<I>>;
}
