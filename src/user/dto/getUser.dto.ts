import { ApiProperty } from '@nestjs/swagger';
import { TagsDto } from '../../tag/dto/tags.dto';

export class GetUserDto {
  @ApiProperty({ example: `mail@mail.com`, description: `Почтовый адрес` })
  email: string;
  @ApiProperty({ example: `ruhose73`, description: `Псевдоним пользователя` })
  nickname: string;
  @ApiProperty({ type: [TagsDto] })
  tags: Array<TagsDto>;
}
