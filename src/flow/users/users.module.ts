import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
