import { forwardRef, Module } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TagController],
  providers: [TagService, TokenService],
  exports: [TagService],
  imports: [forwardRef(() => AuthModule)],
})
export class TagModule {}
