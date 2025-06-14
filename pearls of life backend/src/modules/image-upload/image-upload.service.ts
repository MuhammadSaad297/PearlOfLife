import { Inject, Injectable } from '@nestjs/common';
import { FILE_CATEGORIES, PROFILE_PIC_BASE_PATH, TABLES } from 'src/common/constants';
import ImageCategories from './entities/image-categories.entity';
import ImageDetails from './entities/image-details.entity';
import ImageFolders from './entities/image-folder.entity';
import { extname } from 'path';

@Injectable()
export class ImageUploadService {
    constructor(
        @Inject(TABLES.IMAGE_CATEGORIES)
        private readonly imageCategoryRepository: typeof ImageCategories,
        @Inject(TABLES.IMAGE_DETAILS)
        private readonly imageDetailsRepository: typeof ImageDetails,
        @Inject(TABLES.IMAGE_FOLDERS)
        private readonly imageFoldersRepository: typeof ImageFolders
    ) { }

    async getImageCategoryByName(name: string): Promise<ImageCategories> {
        const imageCategory = await this.imageCategoryRepository.findOne({
            where: {
                name: name
            }
        });
        return imageCategory;
    }

    async removeImageDetails(user_id: string, category_name) {
        const imageCategory = await this.getImageCategoryByName(category_name);
        await this.imageDetailsRepository.update({
            updated_on: new Date(),
            updated_by: user_id,
            deleted_on: new Date(),
            deleted_by: user_id
        }, {
            where: {
                user_id: user_id,
                image_category_id: imageCategory.id
            },
            returning: true
        });
    }

    async addImageDetails(file: any, user_id: string, category_name: string, image_path: string): Promise<ImageDetails> {
        const imageCategory = await this.getImageCategoryByName(category_name);
        const payload: any = {
            user_id: user_id,
            image_category_id: imageCategory.id,
            image_path: image_path,
            image_file_name: file.originalname,
            image_ext: extname(file.originalname),
            created_by: user_id,

        }
        const imageDetails = await this.imageDetailsRepository.create<ImageDetails>(payload);
        return imageDetails;
    }

    async getImageDetails(user_id: string, category_name: string): Promise<ImageDetails> {
        const imageCategory = await this.getImageCategoryByName(category_name);
        const imageDetails = await this.imageDetailsRepository.findOne({
            where: {
                user_id: user_id,
                image_category_id: imageCategory.id,
                deleted_on: null
            }
        });
        return imageDetails
    }

}