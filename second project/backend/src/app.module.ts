import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.HOST,
        username: process.env.USERNAME,
        database: process.env.DB_NAME,
        password: process.env.PSWD,
        port: parseInt(process.env.DB_PORT, 10),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
