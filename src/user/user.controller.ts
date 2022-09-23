import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from '../auth/dto/CreateUser.dto';
import { GetUserDto } from './dto/getUser.dto';
import { UserDto } from './dto/user.dto';
import { TagsIdArrayDto } from '../tag/dto/tagsIdArray.dto';
import { MyUserTagsDto } from './dto/myUserTags.dto';

@ApiTags(`Пользователи`)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, type: GetUserDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/user')
  getUser(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.getUser(token);
  }

  @ApiOperation({ summary: `Создать пользователя` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Put('/user')
  putUser(@Body() userDto: CreateUserDto) {
    return this.userService.putUser(userDto);
  }

  @ApiOperation({ summary: `Удалить пользователя (себя)` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 201, description: `NO_CONTENT` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/user')
  deleteUser(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.deleteUser(token);
  }

  @ApiOperation({ summary: `Добавить теги к пользователю` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiBody({ type: TagsIdArrayDto })
  @ApiResponse({ status: 200, type: MyUserTagsDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('user/tag')
  userTags(@Req() req, @Body() tags: Array<number>) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.userTag(token, tags);
  }

  @ApiOperation({ summary: `Удалить тег пользователя` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор тега',
  })
  @ApiResponse({ status: 200, type: MyUserTagsDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/user/tag/:id')
  deleteTag(@Req() req, @Param('id') id) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.deleteTag(token, id);
  }

  @ApiOperation({ summary: `Получить свои теги` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, type: MyUserTagsDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/user/tag/my')
  myTags(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.myTags(token);
  }
}
