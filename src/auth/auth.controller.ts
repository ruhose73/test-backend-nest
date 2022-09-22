import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/Token.dto';

@ApiTags(`Авторизация`)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: `Создание пользователя` })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/signin')
  signin(@Body() userDto: CreateUserDto) {
    return this.authService.signin(userDto);
  }

  @ApiOperation({ summary: `Авторизация` })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/login')
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: `Выход из учетной записи` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 201, description: `NO_CONTENT` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 403, description: `UNAUTHORIZED` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Post('/logout')
  logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(token);
  }

  @ApiOperation({ summary: `Обновление токена` })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  @ApiResponse({ status: 200, type: TokenDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 403, description: `UNAUTHORIZED` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get('/refresh')
  refresh(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.refresh(token);
  }
}
