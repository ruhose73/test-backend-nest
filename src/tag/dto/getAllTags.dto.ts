import { ApiProperty } from '@nestjs/swagger';
import { TagWithCreatorDto } from './tagWithCreator.dto';
import MetaDto from './meta.dto';

export class GetAllTagsDto {
  @ApiProperty({ type: [TagWithCreatorDto] })
  data: Array<TagWithCreatorDto>;
  @ApiProperty({ type: MetaDto })
  meta: { MetaDto };
}
