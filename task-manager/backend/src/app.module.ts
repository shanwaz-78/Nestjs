import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host : process.env.HOST,
        username: process.env.USERNAME,
        password: process.env.DB_PSWD,
        database: process.env.DATABASE,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    TaskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
