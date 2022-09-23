import { ApiProperty } from '@nestjs/swagger';

export default class TagDTO {
  @ApiProperty({ example: `Название тега 1`, description: `Название тега` })
  name: string;
  @ApiProperty({ example: 1, description: `Вариант сортировки` })
  sortOrder: number;
  constructor(tagFullInfoElement: any) {
    this.name = tagFullInfoElement.name;
    this.sortOrder = tagFullInfoElement.sortorder;
  }
}
