import { ApiProperty } from '@nestjs/swagger';

export default class CreatorDto {
  @ApiProperty({ example: `ruhose73`, description: `Псевдоним пользователя` })
  nickname: string;
  @ApiProperty({
    example: `wRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
    description: `UUID пользователя`,
  })
  uid: string;
  constructor(tagFullInfoElement: any) {
    this.nickname = tagFullInfoElement.nickname;
    this.uid = tagFullInfoElement.uid;
  }
}
