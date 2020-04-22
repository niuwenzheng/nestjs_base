import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schemas/users.schema';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }]),DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
