/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 16:47:03
 * @LastEditors: nevin
 * @LastEditTime: 2021-07-15 16:38:11
 * @Description: 数据库
 */
import * as mongoose from 'mongoose';

export const IdSchema = new mongoose.Schema({
  id_value: Number,
  id_name: String,
  update_time: Date
});