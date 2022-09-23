import { ApiProperty } from '@nestjs/swagger';

export class TagInputDto {
  @ApiProperty({ example: `Название тега 1`, description: `Название тега` })
  name: string;
  @ApiProperty({ example: 1, description: `Вариант сортировки` })
  sortOrder: number;
}
