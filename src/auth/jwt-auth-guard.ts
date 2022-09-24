import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import * as jwt from 'jsonwebtoken';

export class JwtAuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const userData: any = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET,
      );
      if (!userData) {
        throw new UnauthorizedException({
          message: 'Пользователь не авторизован',
        });
      }
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
