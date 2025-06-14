import { IsNotEmpty, IsString, IsISO8601, IsOptional, IsEmail } from "class-validator";

export class CreateUserDto {

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

    @IsOptional()
    @IsString()
    permanent_address?: string;

    @IsOptional()
    @IsISO8601()
    date_of_birth?: string;
    
    @IsNotEmpty()
    @IsString()
    hashed_password?: string;

}