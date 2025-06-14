import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import MemoryFolders from "./memory-folders.entity";
import ImageDetails from "src/modules/image-upload/entities/image-details.entity";
export default class Memories extends PaginatedModel<Memories> {
    id: string;
    user_id: string;
    folder_id: string;
    folder: MemoryFolders;
    image_details_id: any;
    image_details: ImageDetails;
    memory_date: Date;
    description: string;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof Memories>;
}
