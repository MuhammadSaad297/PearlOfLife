declare class ChildDto {
    name: string;
    dateOfBirth: Date;
}
declare class SiblingDto {
    name: string;
    isAlive: boolean;
}
export declare class CreateObituaryInfoDto {
    user_id?: string;
    birth_name: string;
    married_name: string;
    current_name: string;
    birth_date: Date;
    birth_place: string;
    parent_names: string;
    spouse_name: string;
    children: ChildDto[];
    siblings: SiblingDto[];
}
export {};
