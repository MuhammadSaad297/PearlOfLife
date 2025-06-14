import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { CreateObituaryInfoDto } from './dtos/create-obituary-info.dto';
import { FilterObituaryInfoDto } from './dtos/filter-obituary-info.dto';
import ObituaryInfo from './entities/obituary-info.entity';
export declare class ObituaryInfoService {
    private readonly obituaryInfoRepository;
    constructor(obituaryInfoRepository: typeof ObituaryInfo);
    findAll(pageOptions: FilterObituaryInfoDto, user_id: string): Promise<PaginateDto<ObituaryInfo>>;
    findOne(id: string): Promise<ObituaryInfo>;
    create(input: CreateObituaryInfoDto, created_by: string): Promise<ObituaryInfo>;
    update(id: string, input: Partial<CreateObituaryInfoDto>, updated_by: string): Promise<[number, ObituaryInfo[]]>;
    delete(id: string, user_id: string): Promise<void>;
}
