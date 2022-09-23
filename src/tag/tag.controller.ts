import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TagService } from './tag.service';

@ApiTags(`Теги`)
@Controller()
export class TagController {
  constructor(private tagService: TagService) {}

  @ApiOperation({ summary: `Создание пользователя` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/tag')
  createTag() {
    return this.tagService.createTag();
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
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/tag/:id')
  getTagById() {
    return this.tagService.getTagById();
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
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Put('/tag/:id')
  updateTag() {
    return this.tagService.updateTag();
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
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/tag/:id')
  deleteTag() {
    return this.tagService.deleteTag();
  }

  @ApiOperation({ summary: `Получение всех тегов` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/tag')
  allTags() {
    return this.tagService.allTags();
  }
}
