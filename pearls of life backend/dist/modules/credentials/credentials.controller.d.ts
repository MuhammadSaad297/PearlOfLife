import { CredentialsService } from './credentials.service';
import { FilterCredentialsDto } from './dtos/filter-credentials.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import Credentials from './entities/credentials.entity';
import { CreateCredentialsDto } from './dtos/create-credentials.dto';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { UpdateCredentialsDto } from './dtos/update-credentials.dto';
export declare class CredentialsController {
    private readonly credentialsService;
    constructor(credentialsService: CredentialsService);
    findAll(filterCredentialsDto: FilterCredentialsDto, user: any): Promise<PaginateDto<Credentials>>;
    findAllByUserId(filterCredentialsDto: FilterCredentialsDto, user_id: string): Promise<PaginateDto<Credentials>>;
    create(input: CreateCredentialsDto, user: any): Promise<ResponseMessageOutput>;
    update(id: string, input: UpdateCredentialsDto, user: any): Promise<ResponseMessageOutput>;
    delete(id: string, user: any): Promise<ResponseMessageOutput>;
}
