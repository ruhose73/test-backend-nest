import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TagService } from './tag.service';
import { TagInputDto } from './dto/tagInput.dto';
import { TagsDto } from './dto/tags.dto';
import { TagsIdArrayDto } from './dto/tagsIdArray.dto';
import TagDTO from './dto/tag.dto';
import { TagWithCreatorDto } from './dto/tagWithCreator.dto';
import { GetAllTagsDto } from './dto/getAllTags.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@ApiTags(`Теги`)
@Controller()
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOperation({ summary: `Создание тега` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiBody({ type: TagDTO })
  @ApiResponse({ status: 200, type: TagsDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(JwtAuthGuard)
  @Post('/tag')
  createTag(@Req() req, @Body() tagDto: TagInputDto) {
    const token = req.headers.authorization.split(' ')[1];
    return this.tagService.createTag(token, tagDto);
  }

  @ApiOperation({ summary: `Получение тега по ID` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор тега',
  })
  @ApiResponse({ status: 200, type: TagWithCreatorDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(JwtAuthGuard)
  @Get('/tag/:id')
  getTagById(@Param('id') id) {
    return this.tagService.getTagById(id);
  }

  @ApiOperation({ summary: `Обновление тега по ID` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор тега',
  })
  @ApiBody({ type: TagDTO })
  @ApiResponse({ status: 200, type: TagWithCreatorDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(JwtAuthGuard)
  @Put('/tag/:id')
  updateTag(@Req() req, @Param('id') id) {
    const token = req.headers.authorization.split(' ')[1];
    return this.tagService.updateTag(
      id,
      token,
      { name: req.body.name ? req.body.name : null },
      { sortorder: req.body.sortOrder ? req.body.sortOrder : null },
    );
  }

  @ApiOperation({ summary: `Удаление тега по ID` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор тега',
  })
  @ApiResponse({ status: 204, description: `NO_CONTENT` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(JwtAuthGuard)
  @Delete('/tag/:id')
  @HttpCode(204)
  deleteTag(@Req() req, @Param('id') id) {
    const token = req.headers.authorization.split(' ')[1];
    return this.tagService.deleteTag(token, id);
  }

  @ApiOperation({ summary: `Получение всех тегов` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiQuery({ name: 'sortByOrder', description: `Сортировка order` })
  @ApiQuery({ name: 'offset', description: `Сдвиг по элементам` })
  @ApiQuery({ name: 'sortByName', description: `Сортировка name` })
  @ApiQuery({ name: 'length', description: `Количество элементов` })
  @ApiResponse({ status: 200, type: GetAllTagsDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(JwtAuthGuard)
  @Get('/tag')
  allTags(@Req() req) {
    return this.tagService.allTags({
      sortByOrder: req.query.sortByOrder == '' ? true : false,
      offset: req.query.offset ? req.query.offset : 0,
      sortByName: req.query.sortByName == '' ? true : false,
      length: req.query.length ? req.query.length : 10,
    });
  }
}
