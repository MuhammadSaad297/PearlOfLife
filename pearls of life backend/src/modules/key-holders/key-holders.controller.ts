import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGraud } from 'src/common/guards/auth.guard';
import KeyHolders from './entities/key-holders.entity';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { KeyHoldersService } from './key-holders.service';
import { FilterKeyHoldersDto } from './dtos/filter-key-holders.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { KEY_HOLDERS_BASE_PATH, MESSAGE } from 'src/common/constants';
import { CreateKeyHolderDto } from './dtos/create-key-holder.dto';
import { SuccessMessageResponse } from 'src/common/utils/app.utils';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';

@UseGuards(AuthGraud)
@Controller('key-holders')
export class KeyHoldersController {

    constructor(
        private readonly keyHoldersService: KeyHoldersService,
        private readonly userService: UsersService,
        private readonly emailService: EmailService
    ) { }

    @Get()
    findAll(
        @Query() filterKeyHoldersDto: FilterKeyHoldersDto,
        @CurrentUser() user: any
    ) {
        return this.keyHoldersService.findAll(filterKeyHoldersDto, user.user_id);
    }

    @Get('user/:user_id')
    findAllByUserId(
        @Query() filterKeyHoldersDto: FilterKeyHoldersDto,
        @Param('user_id') user_id: string,
        @CurrentUser() user: any
    ): Promise<PaginateDto<KeyHolders>> {
        return this.keyHoldersService.findAll(filterKeyHoldersDto, user_id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            // destination: (req, file, callback) => {
            //     const user: any = req?.user;
            //     let parsedBody: any = JSON.parse(req.body?.body);
            //     // console.log(req.body)
            //     const folder = `${KEY_HOLDERS_BASE_PATH}/${user?.user_id}/${parsedBody.first_name}_${parsedBody.last_name}`;
            //     // Ensure the folder exists
            //     if (!fs.existsSync(folder)) {
            //         fs.mkdirSync(folder, { recursive: true }); // Create folder and parents if needed
            //     }
            //     callback(null, folder); // Set destination folder
            // },
            destination: './temp',
            filename: (req, file, callback) => {
                callback(null, file?.originalname);
            },

        })
    }))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @CurrentUser() user: any,
        @Req() req: any,
        @Body('text') body: any
    ): Promise<ResponseMessageOutput> {
        let parsedBody = JSON.parse(body);
        parsedBody.user_id = user.user_id;
        const keyHolder = await this.keyHoldersService.create(parsedBody, user.user_id);
        const userDetails = await this.userService.findOne(user.user_id);
        this.emailService.sendKeyHolderRegistrationEmail(keyHolder, `${userDetails?.first_name} ${userDetails?.last_name}`);
        // parsedBody.id = keyHolder.id;
        // req.body.id = JSON.stringify(parsedBody);
        if (file) {
            const finalFolder = `${KEY_HOLDERS_BASE_PATH}/${user?.user_id}/${keyHolder.id}`;
            // Ensure folder exists
            if (!fs.existsSync(finalFolder)) {
                fs.mkdirSync(finalFolder, { recursive: true });
            }
            const targetPath = path.join(finalFolder, file.filename);
            fs.renameSync(file.path, targetPath);
            const filePath = `${KEY_HOLDERS_BASE_PATH}/${user.user_id}/${keyHolder.id}/${file.originalname}`;
            await this.keyHoldersService.updateKeyHolderImage(keyHolder.id, filePath, user.user_id);
            keyHolder['image_path'] = filePath;
        }

        return SuccessMessageResponse(MESSAGE.RECORD_CREATED_SUCCESSFULLY, keyHolder);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ) {
        const keyHolder = await this.keyHoldersService.findOne(id);
        if (!keyHolder) {
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND);
        }
        return keyHolder;
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @CurrentUser() user: any
    ): Promise<ResponseMessageOutput> {
        const isExists = await this.keyHoldersService.findOne(id);
        if (!isExists) {
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND);
        }
        this.keyHoldersService.delete(id, user.user_id);
        return SuccessMessageResponse(MESSAGE.RECORD_DELETED_SUCCESSFULLY);
    }

}
