/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 16:47:03
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 15:40:38
 * @Description: 用户
 */
import * as mongoose from 'mongoose';
import { UserStatus } from '../enum/user.enum';

export const UsersSchema = new mongoose.Schema(
  {
    user_id: String,
    user_name: String,
    age: Number,
    status: { type: Number, default: UserStatus.NORMAL },
    create_time: { type: Number, default: 0 },
    update_time: { type: Number, default: 0 },
  },
  { collection: 't_users', versionKey: false },
);
