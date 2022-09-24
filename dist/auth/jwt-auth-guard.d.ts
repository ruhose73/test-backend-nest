import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
export declare class JwtAuthGuard implements CanActivate {
    private tokenService;
    constructor(tokenService: TokenService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
