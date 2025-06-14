import { PaginatedModel } from "src/common/providers/paginated-model.provider";
export default class Notes extends PaginatedModel<Notes> {
    id: string;
    user_id: string;
    heading: string;
    description: string;
    note_date: Date;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof Notes>;
}
