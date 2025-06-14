import { PageMetaDto } from "./page-meta.dto";
export declare class PaginateDto<T> {
    constructor(data: T[], meta: PageMetaDto);
    readonly meta: PageMetaDto;
    readonly data: T[];
}
