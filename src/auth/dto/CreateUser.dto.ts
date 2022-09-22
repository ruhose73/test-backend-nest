import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: `mail@mail.com`, description: `Почтовый адрес` })
  email: string;
  @ApiProperty({ example: `Misha!234`, description: `Пароль пользователя` })
  password: string;
  @ApiProperty({ example: `ruhose73`, description: `Псевдоним пользователя` })
  nickname: string;
}
