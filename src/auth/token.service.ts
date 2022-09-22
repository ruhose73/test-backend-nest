import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

type UserPayload = {
  uid: string;
  email: string;
  nickname: string;
  password: string;
};

interface Token {
  user: Array<UserPayload>;
  iat: number;
  exp: number;
}

@Injectable()
export class TokenService {
  async generateToken(payload) {
    try {
      const token: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '30m',
      });
      const tokenExpire: any | Token = jwt.decode(token);
      const expire: string = tokenExpire.exp;
      return { token, expire };
    } catch (e) {
      throw new HttpException(`${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateAccessToken(token) {
    try {
      const userData: any = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      throw new HttpException(`${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
