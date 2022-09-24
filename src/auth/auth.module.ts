import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService, TokenService],
  imports: [forwardRef(() => UserModule), forwardRef(() => TagModule)],
})
export class AuthModule {}
