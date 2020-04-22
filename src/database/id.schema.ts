/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 16:47:03
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-04-14 14:11:30
 * @Description: file content
 */
import * as mongoose from 'mongoose';

export const IdSchema = new mongoose.Schema({
  id_value: Number,
  id_name: String,
  update_time: Date
});