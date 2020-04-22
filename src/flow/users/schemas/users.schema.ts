/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 16:47:03
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-04-03 17:12:28
 * @Description: file content
 */
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  age: Number,
});