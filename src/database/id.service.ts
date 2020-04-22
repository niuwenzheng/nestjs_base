import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

export interface Users extends Document {
  readonly user_id: string;
  readonly user_name: string;
  readonly age: number;
}
interface Id extends Document {
  readonly id_value: number;
  readonly id_name: string;
}
interface CreateIDDto {
  readonly id_value: number;
  readonly id_name: string;
}
@Injectable()
export class IdService {
  constructor(@InjectModel('Id') private readonly idModel: Model<Id>) {}

  /**
   * @description: 创建数据
   * @param {CreateIDDto} createUsersDto id对象
   * @return:
   */
  async _createId(id_name: string, id_value: number): Promise<number> {
    const fadArgs = {
      query: {
        id_name,
      },
      update: {
        $inc: { id_value: 1 },
        $set: { update_time: new Date() },
      },
      options: { new: true },
    };
    let newId = await this.idModel.findOneAndUpdate( fadArgs.query, fadArgs.update, fadArgs.options ).exec();
    if(newId){
      return newId.id_value;
    }
    const createdUser = new this.idModel({ id_name, id_value });
    newId = await createdUser.save();
    return newId.id_value;
  }

  async createUserId(): Promise<string> {
    const newUserID = await this._createId('users', 10000);
    return newUserID.toString();
  }
}
