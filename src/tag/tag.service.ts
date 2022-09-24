import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TagInputDto } from './dto/tagInput.dto';
import TagDTO from './dto/tag.dto';
import CreatorDTO from './dto/creator.dto';
import MetaDTO from './dto/meta.dto';

@Injectable()
export class TagService {
  constructor(
    private tokenService: TokenService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createTag(accessToken, tagDto: TagInputDto) {
    try {
      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }
      const candidate = await this.dataSource.query(
        'SELECT id FROM tags WHERE name = $1',
        [tagDto.name],
      );
      if (candidate.length > 0) {
        throw new HttpException(
          'Такой тег уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const tag = await this.dataSource.query(
        'INSERT INTO tags (creator, name, sortorder) VALUES ($1,$2,$3) RETURNING id, name, sortorder',
        [userData.user[0].uid, tagDto.name, tagDto.sortOrder],
      );
      await this.dataSource.query(
        'INSERT INTO usertags (creatorid, tagid) VALUES ($1,$2)',
        [userData.user[0].uid, tag[0].id],
      );
      return tag[0];
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTagById(tagId) {
    try {
      const tagFullInfo = await this.dataSource.query(
        'SELECT tags.id, tags.creator, tags.name, tags.sortOrder, users.nickname, users.uid ' +
          'FROM tags LEFT OUTER JOIN users on tags.creator = users.uid WHERE tags.id = $1',
        [tagId],
      );
      const tag = new TagDTO(tagFullInfo[0]);
      const creator = new CreatorDTO(tagFullInfo[0]);
      return { creator, ...tag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTag(tagId, accessToken, name, sortorder) {
    try {
      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }
      await this.dataSource.query(
        'UPDATE tags SET name = COALESCE($1, name), sortorder = COALESCE($2, sortorder) ' +
          'WHERE id = $3 AND creator = $4',
        [name.name, sortorder.sortorder, tagId, userData.user[0].uid],
      );
      const tagFullInfo = await this.dataSource.query(
        'SELECT tags.id, tags.creator, tags.name, tags.sortOrder, users.nickname, users.uid ' +
          'FROM tags LEFT OUTER JOIN users on tags.creator = users.uid WHERE tags.id = $1',
        [tagId],
      );
      const creator = new CreatorDTO(tagFullInfo[0]);
      const tag = new TagDTO(tagFullInfo[0]);
      return { creator, ...tag };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async allTags(inputParams) {
    try {
      const tagsFullInfo = await this.dataSource.query(
        `SELECT tags.id, tags.creator, tags.name, tags.sortorder, users.nickname, users.uid ` +
          `FROM tags LEFT OUTER JOIN users on tags.creator = users.uid` +
          ` ORDER BY (${
            inputParams.sortByOrder == true
              ? 'sortorder'
              : inputParams.sortByName == true
              ? 'name'
              : 'id'
          }) LIMIT $1 OFFSET $2`,
        [inputParams.length, inputParams.offset],
      );
      const data = [];
      tagsFullInfo.forEach((element) => {
        const creator = new CreatorDTO(element);
        const tag = new TagDTO(element);
        data.push({ creator, ...tag });
      });
      const countTags = await this.dataSource.query(
        `SELECT COUNT(*) FROM tags`,
      );
      const meta = new MetaDTO({
        offset: inputParams.offset,
        length: inputParams.length,
        quantity: countTags[0].count,
      });
      return { data, meta };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
