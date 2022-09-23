import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: `mail@mail.com`, description: `Почтовый адрес` })
  email: string;
  @ApiProperty({ example: `ruhose73`, description: `Псевдоним пользователя` })
  nickname: string;
}
