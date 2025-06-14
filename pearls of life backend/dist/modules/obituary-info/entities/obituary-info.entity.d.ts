import { PaginatedModel } from 'src/common/providers/paginated-model.provider';
export default class ObituaryInfo extends PaginatedModel<ObituaryInfo> {
    id: string;
    user_id: string;
    birth_name: string;
    married_name: string;
    current_name: string;
    birth_date: Date;
    birth_place: string;
    parent_names: string;
    spouse_name: string;
    children: {
        name: string;
        dateOfBirth: Date;
    }[];
    siblings: {
        name: string;
        isAlive: boolean;
    }[];
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof ObituaryInfo>;
}
