import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.HOST,
        username: process.env.USERNAME,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: Number(process.env.DB_PORT ?? 5432),
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
