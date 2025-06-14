import KeyHolders from './entities/key-holders.entity';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { KeyHoldersService } from './key-holders.service';
import { FilterKeyHoldersDto } from './dtos/filter-key-holders.dto';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
export declare class KeyHoldersController {
    private readonly keyHoldersService;
    private readonly userService;
    private readonly emailService;
    constructor(keyHoldersService: KeyHoldersService, userService: UsersService, emailService: EmailService);
    findAll(filterKeyHoldersDto: FilterKeyHoldersDto, user: any): Promise<PaginateDto<KeyHolders>>;
    findAllByUserId(filterKeyHoldersDto: FilterKeyHoldersDto, user_id: string, user: any): Promise<PaginateDto<KeyHolders>>;
    create(file: Express.Multer.File, user: any, req: any, body: any): Promise<ResponseMessageOutput>;
    findOne(id: string): Promise<KeyHolders>;
    delete(id: string, user: any): Promise<ResponseMessageOutput>;
}
