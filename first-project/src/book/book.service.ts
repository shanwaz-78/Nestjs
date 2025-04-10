import { Injectable } from '@nestjs/common';
import { Books } from './data/book.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class BookService {
  public books: Books[] = [];

  addBookService(book: Books): string {
    book.id = uuidv4();
    this.books.push(book);
    return 'Book has been successfully added';
  }

  updateBookService(book: Books): string {
    let index = this.books.findIndex((currentBook) => {
      return currentBook.id === book.id;
    });
    this.books[index] = book;
    return `Book has been successfully updated`;
  }

  deleteBookService(bookId: string): string {
    this.books = this.books.filter((currentBook) => {
      return currentBook.id !== bookId;
    });
    return `Book has been deleted`;
  }

  findAllBooks(): Books[] {
    return this.books;
  }
}
