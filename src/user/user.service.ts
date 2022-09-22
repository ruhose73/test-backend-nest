import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private tokenService: TokenService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  //! Получить себя
  async getUser(accessToken) {
    const userData = await this.tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
    }
    const user = await this.dataSource.query(
      'SELECT email, nickname FROM users WHERE uid = $1',
      [userData.user[0].uid],
    );
    const tags = await this.dataSource.query(
      'SELECT id, name, sortorder FROM tags WHERE creator = $1',
      [userData.user[0].uid],
    );
    user[0].tags = tags;
    console.log(user[0]);
    return user[0];
  }

  //! Добавить пользователя
  async putUser(accessToken) {
    console.log(`хуй`);
  }

  //! Удалить пользователя
  async deleteUser(accessToken) {
    console.log(`хуй`);
  }

  //! Получить теги пользователя
  async userTags(accessToken) {
    console.log(`хуй`);
  }

  //! Удалить тег пользователя
  async deleteTag(accessToken) {
    console.log(`хуй`);
  }

  //! Получить свои теги
  async myTags(accessToken) {
    console.log(`хуй`);
  }
}
