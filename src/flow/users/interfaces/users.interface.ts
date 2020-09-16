/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 17:20:17
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 15:18:02
 * @Description: file content
 */
import { Document } from 'mongoose';

export interface Users {
  readonly user_id: string;
  readonly user_name: string;
  readonly age: number;
}

export interface UsersModel extends Users, Document {}

export interface CreateUsers {
  readonly user_name: string;
  readonly age: number;
}
