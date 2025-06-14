import { IsNotEmpty, IsString, IsOptional, IsEmail } from "class-validator";

export class CreateKeyHolderDto {

    @IsOptional()
    id: string;

    @IsOptional()
    file: any;

    @IsNotEmpty()
    @IsString()
    first_name: string;
    
    @IsNotEmpty()
    @IsString()
    last_name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    phone_number?: string;

    @IsOptional()
    @IsString()
    address?: string;

}