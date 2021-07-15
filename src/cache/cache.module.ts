import { Global, Module } from '@nestjs/common';
import { MyRedisModule } from './redis/redis.module';
@Global()
@Module({
  imports: [MyRedisModule]
})
export class CacheModule {}
