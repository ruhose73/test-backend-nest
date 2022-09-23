import { Module } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  controllers: [TagController],
  providers: [TagService, TokenService],
})
export class TagModule {}
