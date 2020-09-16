/*
 * @Author: niuwenzheng
 * @Date: 2020-04-04 13:27:39
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 15:33:37
 * @Description: 用户
 */
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { IdService } from '../../database/id.service';
import { CreateUsers, Users, UsersModel } from './interfaces/users.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<UsersModel>,
    private readonly idService: IdService,
  ) {}

  /**
   * @description: 创建id
   * @return {type}
   */
  private async createUserId() {
    return await this.idService.createId('users', 10000);
  }

  /**
   * @description: 创建数据
   * @param {type}
   * @return:
   */

  async create(createUsersInfo: CreateUsers): Promise<Users> {
    const newUserInfo: Users = {...createUsersInfo, user_id: (await this.createUserId()) as string}
    const createdUser = new this.usersModel(newUserInfo);
    return await createdUser.save();
  }

  // 查询全部数据
  async findAll(): Promise<Users[]> {
    return await this.usersModel.find().exec();
  }

  // 根据user_id查询
  async findByUserId(user_id: string): Promise<Users> {
    return await this.usersModel.findOne({ user_id }).exec();
  }

  // 根据id查询
  async findById(user_id): Promise<Users> {
    return await this.usersModel.findById(user_id).exec();
  }
}
