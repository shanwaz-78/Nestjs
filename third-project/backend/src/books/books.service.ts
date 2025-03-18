import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      if (!createBookDto.title || !createBookDto.author) {
        throw new BadRequestException('Title and author are required fields.');
      }

      const createdBook = this.bookRepository.create(createBookDto);
      return await this.bookRepository.save(createdBook);
    } catch (error) {
      console.error(`[Error in createBook]: ${error.message}`);
      throw new BadRequestException(
        'Failed to create book. Please check the provided data.',
      );
    }
  }

  async findAll(): Promise<Book[]> {
    try {
      const allBooks = await this.bookRepository.find();
      if (allBooks.length === 0) {
        throw new NotFoundException('No books found.');
      }
      return allBooks;
    } catch (error) {
      console.error(`[Error in findAll]: ${error.message}`);
      throw new BadRequestException('Failed to retrieve books.');
    }
  }

  async findOne(id: number): Promise<Book> {
    try {
      const singleBook = await this.bookRepository.findOne({ where: { id } });

      if (!singleBook) {
        throw new NotFoundException(`Book with ID ${id} not found.`);
      }

      return singleBook;
    } catch (error) {
      console.error(`[Error in findOne]: ${error.message}`);
      throw new BadRequestException(
        'Failed to find book. Please check the book ID.',
      );
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      const existingBook = await this.bookRepository.preload({
        id,
        ...updateBookDto,
      });

      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${id} not found.`);
      }

      return await this.bookRepository.save(existingBook);
    } catch (error) {
      console.error(`[Error in update]: ${error.message}`);
      throw new BadRequestException(
        'Failed to update book. Please check the provided data.',
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const bookToDelete = await this.bookRepository.findOne({ where: { id } });

      if (!bookToDelete) {
        throw new NotFoundException(`Book with ID ${id} not found.`);
      }

      await this.bookRepository.remove(bookToDelete);
      return { message: `Book with ID ${id} successfully deleted.` };
    } catch (error) {
      console.error(`[Error in remove]: ${error.message}`);
      throw new BadRequestException(
        'Failed to delete book. Please check the book ID.',
      );
    }
  }
}
