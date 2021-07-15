import { Global, Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { CacheService } from './cache.service';
import * as config from './config';
const options = config.default();

@Global()
@Module({
  imports: [RedisModule.register(options)],
  providers: [CacheService],
  exports: [CacheService],
})

export class MyRedisModule {}