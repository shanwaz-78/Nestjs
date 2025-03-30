import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './Entity/book.entity';
import { BookDTO } from './DTO/book.dto';
import { UpdateBookDTO } from './DTO/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async createBook(
    bookData: BookDTO,
  ): Promise<{ message: string; book: BookEntity }> {
    const newBook = this.bookRepository.create(bookData);
    const createdBook = await this.bookRepository.save(newBook);
    return { message: `Book Created Successfully`, book: createdBook };
  }

  async getAllBooks(): Promise<{ message?: string; books?: BookEntity[] }> {
    const allBooks = await this.bookRepository.find();

    if (allBooks.length === 0) {
      throw new NotFoundException(`No books are available.`);
    }

    return { books: allBooks };
  }

  async getSingleBook(
    id: number,
  ): Promise<{ message?: string; book?: BookEntity }> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`book with id #${id} not found.`);
    }

    return { book };
  }

  async updateBook(
    id: number,
    updatedBook: UpdateBookDTO,
  ): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with id #${id} not found.`);
    }

    Object.assign(book, updatedBook);
    return book;
  }
}
