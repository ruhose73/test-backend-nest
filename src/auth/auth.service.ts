import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { TokenService } from './token.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoginUserDto } from './dto/LoginUser.dto';
import { TokenPayloadDto } from './dto/TokenPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async signin(dto: CreateUserDto) {
    try {
      const candidate = await this.dataSource.query(
        'SELECT uid FROM users WHERE email = $1 OR nickname = $2',
        [dto.email, dto.nickname],
      );
      if (candidate.length > 0) {
        throw new HttpException(
          'Пользователь с таким email или nickname уже существует',
          HttpStatus.BAD_REQUEST,
        );
      }
      const userId = uuid();
      const hashedPassword = await bcrypt.hash(dto.password, 5);
      const user = await this.dataSource.query(
        'INSERT INTO users (uid, email, password, nickname) VALUES ($1,$2,$3,$4) RETURNING uid, email, nickname',
        [userId, dto.email, hashedPassword, dto.nickname],
      );
      const token = this.tokenService.generateToken({ user });
      return token;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(dto: LoginUserDto) {
    try {
      const user = await this.dataSource.query(
        'SELECT uid, email, password, nickname FROM users WHERE email = $1',
        [dto.email],
      );
      const isPassEquals = await bcrypt.compare(dto.password, user[0].password);
      if (!isPassEquals) {
        throw new HttpException('Неверные данные', HttpStatus.BAD_REQUEST);
      }
      const token = this.tokenService.generateToken({ user });
      return token;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(accessToken) {
    try {
      const userData = this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refresh(accessToken) {
    try {
      const userData = await this.tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.dataSource.query(
        'SELECT uid, email, password, nickname FROM users WHERE email = $1',
        [userData.user[0].email],
      );
      const token = this.tokenService.generateToken({ user });
      return token;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
