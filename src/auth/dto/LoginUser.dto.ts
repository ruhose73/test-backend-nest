import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: `mail@mail.com`, description: `Почтовый адрес` })
  email: string;
  @ApiProperty({ example: `Misha!234`, description: `Пароль пользователя` })
  password: string;
}
