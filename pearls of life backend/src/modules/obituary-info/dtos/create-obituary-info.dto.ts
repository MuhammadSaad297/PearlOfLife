import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class ChildDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;
}

class SiblingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isAlive: boolean;
}

export class CreateObituaryInfoDto {
  @IsOptional()
  user_id?: string;

  @IsNotEmpty()
  @IsString()
  birth_name: string;

  @IsOptional()
  @IsString()
  married_name: string;

  @IsNotEmpty()
  @IsString()
  current_name: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birth_date: Date;

  @IsNotEmpty()
  @IsString()
  birth_place: string;

  @IsNotEmpty()
  @IsString()
  parent_names: string;

  @IsOptional()
  @IsString()
  spouse_name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChildDto)
  children: ChildDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SiblingDto)
  siblings: SiblingDto[];
}
