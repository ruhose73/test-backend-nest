import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../auth/dto/CreateUser.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private tokenService: TokenService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  //! Получить себя
  async getUser(accessToken) {
    try {
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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //! Добавить пользователя
  async putUser(dto: CreateUserDto) {
    try {
      const candidate = await this.dataSource.query(
        'SELECT uid FROM users WHERE email = $1 OR nickname = $2',
        [dto.email, dto.nickname],
      );
      if (candidate.length > 0) {
        throw new HttpException(
          'Такой пользователь уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userId = uuid();
      const hashedPassword = await bcrypt.hash(dto.password, 5);
      const user = await this.dataSource.query(
        'INSERT INTO users (uid, email, password, nickname) VALUES ($1,$2,$3,$4) RETURNING uid, email, nickname',
        [userId, dto.email, hashedPassword, dto.nickname],
      );
      return user[0];
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //! Удалить пользователя
  async deleteUser(accessToken) {
    try {
      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }
      await this.dataSource.query('DELETE FROM users WHERE uid = $1', [
        userData.user[0].uid,
      ]);
      throw new HttpException('', HttpStatus.NO_CONTENT);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //! Получить теги пользователя
  async userTag(accessToken, tags) {
    const userData = await this.tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
    }
    const data = [];
    const buffer = new ArrayBuffer(16);
    const uint8 = new Uint8Array(buffer);
    for (let i = 0; i < tags.tags.length; i++) {
      const checkTag = await this.dataSource.query(
        'SELECT id, name, sortorder FROM tags WHERE id = $1',
        [tags.tags[i]],
      );
      if (!checkTag.rows[0]) {
        throw new HttpException('Тег не найден', HttpStatus.BAD_REQUEST);
      }
      Atomics.store(uint8, i, tags.tags[i]);
      const updateTag = await this.dataSource.query(
        'UPDATE tags SET creator = COALESCE($1, creator) ' +
          'WHERE id = $2 RETURNING id, name, sortorder',
        [userData.uid, Atomics.load(uint8, i)],
      );
      await this.dataSource.query(
        'UPDATE usertags SET creatorid = COALESCE($1, creatorid) ' +
          'WHERE tagid = $2',
        [userData.uid, Atomics.load(uint8, i)],
      );
      const tag = updateTag[0];
      data.push(tag);
    }
    return { tags: data };
  }

  //! Удалить тег пользователя
  async deleteTag(accessToken, tagId) {
    try {
      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }
      await this.dataSource.query(
        'DELETE FROM tags WHERE id = $1 AND creator = $2',
        [tagId, userData.user[0].uid],
      );
      const tagsFullInfo = await this.dataSource.query(
        'SELECT id, name, sortorder FROM tags WHERE id = $1 AND creator = $2 ',
        [tagId, userData.uid],
      );
      return tagsFullInfo;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //! Получить свои теги
  async myTags(accessToken) {
    try {
      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }
      const tagsFullInfo = await this.dataSource.query(
        'SELECT id,name,sortorder FROM tags WHERE creator = $1 RETURNING id, name, sortorder',
        [userData.user[0].uid],
      );
      return tagsFullInfo;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
