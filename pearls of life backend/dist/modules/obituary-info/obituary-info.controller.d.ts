import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { CreateObituaryInfoDto } from './dtos/create-obituary-info.dto';
import { FilterObituaryInfoDto } from './dtos/filter-obituary-info.dto';
import { ObituaryInfoService } from './obituary-info.service';
export declare class ObituaryInfoController {
    private readonly obituaryInfoService;
    constructor(obituaryInfoService: ObituaryInfoService);
    findAll(filterObituaryInfoDto: FilterObituaryInfoDto, user: any): Promise<import("../../common/dtos/paginate.dto").PaginateDto<import("./entities/obituary-info.entity").default>>;
    findOne(id: string): Promise<import("./entities/obituary-info.entity").default>;
    create(createObituaryInfoDto: CreateObituaryInfoDto, user: any): Promise<ResponseMessageOutput<any>>;
    update(id: string, updateObituaryInfoDto: Partial<CreateObituaryInfoDto>, user: any): Promise<ResponseMessageOutput>;
    delete(id: string, user: any): Promise<ResponseMessageOutput>;
}
