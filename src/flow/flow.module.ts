import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [UsersModule, TestModule]
})
export class FlowModule {}
