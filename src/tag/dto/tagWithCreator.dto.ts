import { ApiProperty } from '@nestjs/swagger';
import CreatorDto from './creator.dto';

export class TagWithCreatorDto {
  @ApiProperty({ type: CreatorDto })
  creator: { CreatorDto };
  @ApiProperty({ example: 'тег номер 1 ', description: `Название тега` })
  name: string;
  @ApiProperty({ example: 1, description: `Вариант сортировки` })
  sortOrder: number;
}
