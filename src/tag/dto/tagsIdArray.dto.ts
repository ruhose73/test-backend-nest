import { ApiProperty } from '@nestjs/swagger';

export class TagsIdArrayDto {
  @ApiProperty({
    type: Array,
    example: [1, 2],
    description: `Вариант сортировки`,
  })
  tags: [id: number];
}
