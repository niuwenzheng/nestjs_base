/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 17:19:03
 * @LastEditors: niuwenzheng
 * @LastEditTime: 2020-04-14 16:14:16
 * @Description: file content
 */
import { IsString, IsInt } from 'class-validator';
import { Type } from "class-transformer";

export class CreateUsersDto {
  @IsString({ message: '用户名必须是字符' })
  readonly user_name: string;

  @Type(() => Number)  
  @IsInt({ message: '年龄必须是数值' })
  readonly age: number;

  user_id?: string;
}
// export class CreateUsersDto {
//   user_id ?: string;
//   readonly user_name: string;
//   readonly age: number;
// }
