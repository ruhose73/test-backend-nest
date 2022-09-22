import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags(`Пользователи`)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/user')
  getUser(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.getUser(token);
  }

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Put('/user')
  putUser(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.putUser(token);
  }

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/user')
  deleteUser(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.deleteUser(token);
  }

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('user/tag')
  userTags(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.userTags(token);
  }

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/user/tag/:id')
  deleteTag(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.deleteTag(token);
  }

  @ApiOperation({ summary: `Получить пользователя (себя)` })
  @ApiResponse({ status: 200, description: `BAD_REQUEST` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete('/user/tag/my')
  myTags(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.userService.myTags(token);
  }
}
