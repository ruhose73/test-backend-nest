import { ApiProperty } from '@nestjs/swagger';
import { TagsDto } from '../../tag/dto/tags.dto';

export class MyUserTagsDto {
  @ApiProperty({ type: [TagsDto] })
  tags: Array<TagsDto>;
}
