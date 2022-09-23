import { ApiProperty } from '@nestjs/swagger';

export default class MetaDto {
  @ApiProperty({ example: 10, description: `Сдвиг выборки` })
  offset: number;
  @ApiProperty({ example: 10, description: `Длина выборки` })
  length: number;
  @ApiProperty({ example: 10, description: `Количество элементов в выборке` })
  quantity: number;
  constructor(meta: any) {
    this.offset = meta.offset;
    this.length = meta.length;
    this.quantity = meta.quantity;
  }
}
