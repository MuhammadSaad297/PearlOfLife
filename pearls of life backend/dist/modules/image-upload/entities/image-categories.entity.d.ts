import { PaginatedModel } from "src/common/providers/paginated-model.provider";
export default class ImageCategories extends PaginatedModel<ImageCategories> {
    id: string;
    name: string;
    created_on: Date;
    created_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof ImageCategories>;
}
