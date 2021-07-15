import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdSchema } from './id.schema';
import { IdService } from './id.service';
import config from './config';
@Global()
@Module({
  imports: [
    MongooseModule.forRoot(config.connectUrl, config.opt),
    MongooseModule.forFeature([{ name: 'Id', schema: IdSchema }]),
  ],
  providers: [IdService],
  exports: [IdService],
})
export class DatabaseModule {}