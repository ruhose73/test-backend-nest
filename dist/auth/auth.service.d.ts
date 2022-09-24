import { CreateUserDto } from './dto/CreateUser.dto';
import { TokenService } from './token.service';
import { DataSource } from 'typeorm';
import { LoginUserDto } from './dto/LoginUser.dto';
export declare class AuthService {
    private tokenService;
    private dataSource;
    constructor(tokenService: TokenService, dataSource: DataSource);
    signin(dto: CreateUserDto): Promise<{
        token: string;
        expire: string;
    }>;
    login(dto: LoginUserDto): Promise<{
        token: string;
        expire: string;
    }>;
    logout(accessToken: any): Promise<any>;
    refresh(accessToken: any): Promise<{
        token: string;
        expire: string;
    }>;
}
