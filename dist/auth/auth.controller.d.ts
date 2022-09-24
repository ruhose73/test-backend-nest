import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(userDto: CreateUserDto): Promise<{
        token: string;
        expire: string;
    }>;
    login(userDto: LoginUserDto): Promise<{
        token: string;
        expire: string;
    }>;
    logout(req: any): Promise<any>;
    refresh(req: any): Promise<{
        token: string;
        expire: string;
    }>;
}
