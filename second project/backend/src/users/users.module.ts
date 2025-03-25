import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('EXPIRY_TIME') },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RegisterEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
