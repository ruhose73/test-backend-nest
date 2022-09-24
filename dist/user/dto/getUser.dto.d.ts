import { TagsDto } from '../../tag/dto/tags.dto';
export declare class GetUserDto {
    email: string;
    nickname: string;
    tags: Array<TagsDto>;
}
