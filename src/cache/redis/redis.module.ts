import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';

const options = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
  db: 0,
};

@Module({
  imports: [RedisModule.register(options)],
})

export class MyRedisModule {}