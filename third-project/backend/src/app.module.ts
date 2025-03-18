import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        username: process.env.USERNAME,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: parseInt(process.env.DB_PORT, 10),
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    BooksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
