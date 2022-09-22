import { Body, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TokenService } from '../auth/token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, TokenService],
})
export class UserModule {}
