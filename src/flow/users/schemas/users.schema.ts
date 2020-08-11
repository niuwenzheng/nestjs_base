/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 16:47:03
 * @LastEditors: nevin
 * @LastEditTime: 2020-08-11 19:30:40
 * @Description: file content
 */
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    user_id: String,
    user_name: String,
    age: Number,
  },
  { collection: 't_users', versionKey: false },
);
