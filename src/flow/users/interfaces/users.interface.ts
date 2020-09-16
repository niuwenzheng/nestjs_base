/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 17:20:17
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 15:39:58
 * @Description: file content
 */
import { Document } from 'mongoose';
import { UserStatus } from '../enum/user.enum';

export interface Users {
  readonly user_id: string;
  readonly user_name: string;
  readonly age: number;

  readonly status?: UserStatus; // 有默认值
  readonly create_time?: number; // 有默认值
  readonly update_time?: number; // 有默认值
}

export interface UsersModel extends Users, Document {}

export interface CreateUsers {
  readonly user_name: string;
  readonly age: number;
}
