import Credentials from './entities/credentials.entity';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { FilterCredentialsDto } from './dtos/filter-credentials.dto';
import { CreateCredentialsDto } from './dtos/create-credentials.dto';
import { UpdateCredentialsDto } from './dtos/update-credentials.dto';
export declare class CredentialsService {
    private readonly credsRepository;
    constructor(credsRepository: typeof Credentials);
    findAll(pageOptions: FilterCredentialsDto, user_id: string): Promise<PaginateDto<Credentials>>;
    findOne(id: string): Promise<Credentials>;
    create(input: CreateCredentialsDto, created_by: string): Promise<Credentials>;
    update(input: UpdateCredentialsDto, id: string, user_id: string): Promise<Credentials>;
    delete(id: string, user_id: any): Promise<void>;
}
