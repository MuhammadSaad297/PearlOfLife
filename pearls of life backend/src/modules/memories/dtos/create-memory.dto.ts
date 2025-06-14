import { IsNotEmpty, IsString, IsOptional, IsEmail, IsISO8601 } from "class-validator";

export class CreateMemoryDto {

    @IsNotEmpty()
    @IsString()
    user_id?: string;

    @IsNotEmpty()
    @IsString()
    folder_id: string;

    @IsNotEmpty()
    @IsString()
    image_details_id: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsISO8601()
    memory_date: string;

}