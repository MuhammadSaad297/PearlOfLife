import { IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateNoteDto {
    
    @IsNotEmpty()
    @IsString()
    heading: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;
    
    @IsISO8601()
    @IsNotEmpty()
    note_date: string;
    
    @IsOptional()
    @IsString()
    user_id?: string;
}