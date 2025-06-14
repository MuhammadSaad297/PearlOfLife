import { IsEmail, IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    hashed_password: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsISO8601()
    @IsOptional()
    date_of_birth: string;

}