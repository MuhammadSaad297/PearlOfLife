import { ORDER } from "../constants";
export declare class PageOptionsDto {
    readonly order?: ORDER;
    readonly order_key?: 'updated_on';
    readonly search?: string;
    readonly page?: number;
    readonly pageSize?: number;
    readonly pagination?: boolean;
}
