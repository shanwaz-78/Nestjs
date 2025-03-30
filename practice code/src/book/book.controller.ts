import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './DTO/book.dto';
import { UpdateBookDTO } from './DTO/update-book.dto';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/add-book')
  createBook(@Body() bookData: BookDTO) {
    return this.bookService.createBook(bookData);
  }

  @Get('/all-books')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getSingleBook(@Param('id') id: string) {
    return this.bookService.getSingleBook(+id);
  }

  @Put('update-book/:id')
  updateBook(@Param('id') id: string, updatedBook: UpdateBookDTO) {
    return this.bookService.updateBook(+id, updatedBook);
  }
}
