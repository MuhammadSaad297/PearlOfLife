import KeyHolders from './entities/key-holders.entity';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { FilterKeyHoldersDto } from './dtos/filter-key-holders.dto';
import { CreateKeyHolderDto } from './dtos/create-key-holder.dto';
import { KeyHolderLoginDto } from '../auth/dtos/keyholder-login.dto';
export declare class KeyHoldersService {
    private readonly keyHoldersRepository;
    constructor(keyHoldersRepository: typeof KeyHolders);
    findAll(pageOptions: FilterKeyHoldersDto, user_id: string): Promise<PaginateDto<KeyHolders>>;
    create(input: CreateKeyHolderDto, created_by: string): Promise<KeyHolders>;
    updateKeyHolderImage(id: any, image_path: any, updated_by: any): Promise<any>;
    findOne(id: string): Promise<KeyHolders>;
    findOneByTokenURL(token_url: string): Promise<KeyHolders>;
    findOneByTokenAndPin(creds: KeyHolderLoginDto): Promise<KeyHolders>;
    delete(id: string, user_id: any): Promise<void>;
}
