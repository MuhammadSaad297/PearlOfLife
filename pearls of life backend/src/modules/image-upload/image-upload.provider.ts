import { Provider } from "@nestjs/common";
import { TABLES } from "src/common/constants";
import ImageDetails from "./entities/image-details.entity";
import ImageCategories from "./entities/image-categories.entity";
import ImageFolders from "./entities/image-folder.entity";

export const imageUploadProvider: Provider[] = [
    {
        provide: TABLES.IMAGE_DETAILS,
        useValue: ImageDetails
    },
    {
        provide: TABLES.IMAGE_CATEGORIES,
        useValue: ImageCategories
    },
    {
        provide: TABLES.IMAGE_FOLDERS,
        useValue: ImageFolders
    }
]