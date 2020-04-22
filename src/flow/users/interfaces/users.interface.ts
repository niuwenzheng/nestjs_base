/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 17:20:17
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-04-03 17:26:37
 * @Description: file content
 */
import { Document } from 'mongoose';

export interface Users extends Document {
  readonly user_id: string;
  readonly user_name: string;
  readonly age: number;
}
