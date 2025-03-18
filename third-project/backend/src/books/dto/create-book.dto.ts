import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  publicationDate?: Date;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  pages?: number;

  @IsString()
  @IsOptional()
  language?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  price?: number;
}
