import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty({
    example: `wRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
    description: `UUID пользователя`,
  })
  uid: string;
  @ApiProperty({ example: `mail@mail.com`, description: `Почтовый адрес` })
  email: string;
  @ApiProperty({ example: `ruhose73`, description: `Псевдоним пользователя` })
  nickname: string;
}
