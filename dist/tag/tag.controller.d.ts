import { TagService } from './tag.service';
import { TagInputDto } from './dto/tagInput.dto';
export declare class TagController {
    private tagService;
    constructor(tagService: TagService);
    createTag(req: any, tagDto: TagInputDto): Promise<any>;
    getTagById(id: any): Promise<{
        name: string;
        sortOrder: number;
        creator: import("./dto/creator.dto").default;
    }>;
    updateTag(req: any, id: any): Promise<{
        name: string;
        sortOrder: number;
        creator: import("./dto/creator.dto").default;
    }>;
    deleteTag(req: any, id: any): Promise<void>;
    allTags(req: any): Promise<{
        data: any[];
        meta: import("./dto/meta.dto").default;
    }>;
}
