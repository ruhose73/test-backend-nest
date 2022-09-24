import { TokenService } from '../auth/token.service';
import { DataSource } from 'typeorm';
import { TagInputDto } from './dto/tagInput.dto';
import CreatorDTO from './dto/creator.dto';
import MetaDTO from './dto/meta.dto';
export declare class TagService {
    private tokenService;
    private dataSource;
    constructor(tokenService: TokenService, dataSource: DataSource);
    createTag(accessToken: any, tagDto: TagInputDto): Promise<any>;
    getTagById(tagId: any): Promise<{
        name: string;
        sortOrder: number;
        creator: CreatorDTO;
    }>;
    updateTag(tagId: any, accessToken: any, name: any, sortorder: any): Promise<{
        name: string;
        sortOrder: number;
        creator: CreatorDTO;
    }>;
    deleteTag(accessToken: any, tagId: any): Promise<void>;
    allTags(inputParams: any): Promise<{
        data: any[];
        meta: MetaDTO;
    }>;
}
