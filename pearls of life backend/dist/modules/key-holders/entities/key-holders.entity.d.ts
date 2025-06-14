import { PaginatedModel } from "src/common/providers/paginated-model.provider";
export default class KeyHolders extends PaginatedModel<KeyHolders> {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    relation: string;
    image_path: string;
    token_url: string;
    pin: string;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof KeyHolders>;
}
