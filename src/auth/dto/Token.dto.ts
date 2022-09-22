import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`,
    description: `Токен пользователя`,
  })
  token: string;
  @ApiProperty({ example: `1800`, description: `expire` })
  expire: number;
}
