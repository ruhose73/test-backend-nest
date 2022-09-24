import { TokenService } from '../auth/token.service';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../auth/dto/CreateUser.dto';
export declare class UserService {
    private tokenService;
    private dataSource;
    constructor(tokenService: TokenService, dataSource: DataSource);
    getUser(accessToken: any): Promise<any>;
    putUser(dto: CreateUserDto): Promise<any>;
    deleteUser(accessToken: any): Promise<void>;
    userTag(accessToken: any, tags: any): Promise<{
        tags: any[];
    }>;
    deleteTag(accessToken: any, tagId: any): Promise<any>;
    myTags(accessToken: any): Promise<any>;
}
