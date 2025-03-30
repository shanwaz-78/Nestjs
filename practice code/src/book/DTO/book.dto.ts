import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  ArrayMinSize,
  IsArray,
} from 'class-validator';

export class BookDTO {
  @IsString()
  @IsNotEmpty()
  bookName!: string;

  @IsString()
  @IsNotEmpty()
  bookAuthor!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  genre!: string[];
}
