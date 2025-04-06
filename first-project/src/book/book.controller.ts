import { Controller, Get, Put, Post, Delete, Body } from '@nestjs/common';
import { BookService } from './book.service';
import { Books } from './data/book.dto';

@Controller('book')
export class BookController {
  
  constructor(private bookService: BookService) {}

  @Get('/findAll')
  getAllBooks(): Books[] {
    return this.bookService.findAllBooks();
  }

  @Put('/update')
  updateBook(@Body() book: Books): string {
    return this.bookService.updateBookService(book);
  }

  @Delete('/delete')
  deleteBook(@Body() bookId: string): string {
    return this.bookService.deleteBookService(bookId);
  }

  @Post('/addBook')
  addBook(@Body() book: Books): string {
    return this.bookService.addBookService(book);
  }
}
