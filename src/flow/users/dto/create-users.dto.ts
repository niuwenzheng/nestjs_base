/*
 * @Author: niuwenzheng
 * @Date: 2020-04-03 17:19:03
 * @LastEditors: nevin
 * @LastEditTime: 2020-09-16 15:11:15
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

}
// export class CreateUsersDto {
//   user_id ?: string;
//   readonly user_name: string;
//   readonly age: number;
// }
