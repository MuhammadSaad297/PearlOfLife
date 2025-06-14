import { UsersService } from '../users/users.service';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { Response } from 'express';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
export declare class PersonalInfoController {
    private readonly usersService;
    private readonly imageUploadService;
    constructor(usersService: UsersService, imageUploadService: ImageUploadService);
    getPersonalInfo(user: any): Promise<import("../users/entities/users.entity").default>;
    updatePerosnalInfo(updatePersonalInfo: UpdateUserDto, user: any): Promise<ResponseMessageOutput>;
    uploadProfilePic(file: Express.Multer.File, user: any, res: Response): Promise<void>;
    getProfilePic(user: any, res: Response): Promise<void>;
}
