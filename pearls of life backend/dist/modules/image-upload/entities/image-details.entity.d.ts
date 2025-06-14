import { PaginatedModel } from "src/common/providers/paginated-model.provider";
export default class ImageDetails extends PaginatedModel<ImageDetails> {
    id: string;
    user_id: string;
    image_category_id: string;
    folder_id: string;
    image_path: string;
    image_file_name: string;
    image_ext: string;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof ImageDetails>;
}
