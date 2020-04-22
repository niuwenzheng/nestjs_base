import { Module } from '@nestjs/common';
import { MyRedisModule } from './redis/redis.module';

@Module({
  imports: [MyRedisModule]
})
export class CacheModule {}
