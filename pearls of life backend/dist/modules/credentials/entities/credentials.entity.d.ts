import { PaginatedModel } from "src/common/providers/paginated-model.provider";
export default class Credentials extends PaginatedModel<Credentials> {
    id: string;
    user_id: string;
    domain_name: string;
    domain_url: Date;
    username: Date;
    password: Date;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof Credentials>;
}
