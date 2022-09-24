import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/CreateUser.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(req: any): Promise<any>;
    putUser(userDto: CreateUserDto): Promise<any>;
    deleteUser(req: any): Promise<void>;
    userTags(req: any, tags: Array<number>): Promise<{
        tags: any[];
    }>;
    deleteTag(req: any, id: any): Promise<any>;
    myTags(req: any): Promise<any>;
}
