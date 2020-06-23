import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { ValidationPipe } from '../validation.pipe'
import {IdService} from '../../database/id.service'

import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly idService: IdService) {}

  @Post()
  async create(@Body( new ValidationPipe() ) createUsersInfo: CreateUsersDto) {
    const userId = await this.idService.createUserId();
    createUsersInfo.user_id = userId;
    return await this.usersService.create(createUsersInfo);
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @Get('/:user_id')
  async findByUserId(@Param('user_id') user_id): Promise<Users> {
    return await this.usersService.findByUserId(user_id);
  }
}
