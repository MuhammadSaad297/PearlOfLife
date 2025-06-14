import ImageCategories from './entities/image-categories.entity';
import ImageDetails from './entities/image-details.entity';
import ImageFolders from './entities/image-folder.entity';
export declare class ImageUploadService {
    private readonly imageCategoryRepository;
    private readonly imageDetailsRepository;
    private readonly imageFoldersRepository;
    constructor(imageCategoryRepository: typeof ImageCategories, imageDetailsRepository: typeof ImageDetails, imageFoldersRepository: typeof ImageFolders);
    getImageCategoryByName(name: string): Promise<ImageCategories>;
    removeImageDetails(user_id: string, category_name: any): Promise<void>;
    addImageDetails(file: any, user_id: string, category_name: string, image_path: string): Promise<ImageDetails>;
    getImageDetails(user_id: string, category_name: string): Promise<ImageDetails>;
}
