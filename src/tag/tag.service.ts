import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TokenService } from '../auth/token.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    private tokenService: TokenService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async createTag() {
    try {
      console.log(`хуй`);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTagById() {
    try {
      console.log(`хуй`);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTag() {
    try {
      console.log(`хуй`);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTag() {
    try {
      console.log(`хуй`);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async allTags() {
    try {
      console.log(`хуй`);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
