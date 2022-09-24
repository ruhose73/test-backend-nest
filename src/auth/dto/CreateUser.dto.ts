import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: `mail@mail.com`, description: `Почтовый адрес` })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 32, { message: 'Пароль не меньше 8 символов' })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/, {
    message: 'password too weak',
  })
  @ApiProperty({ example: `Misha!234`, description: `Пароль пользователя` })
  password: string;
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: `ruhose73`, description: `Псевдоним пользователя` })
  nickname: string;
}
