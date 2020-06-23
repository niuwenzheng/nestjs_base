import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdSchema } from './id.schema';
import { IdService } from './id.service';
@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/app_server', {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      user: 'xxxx',
      pass: 'xxxx'
    }),
    MongooseModule.forFeature([{ name: 'Id', schema: IdSchema }])
  ],
  providers: [IdService],
  exports: [IdService]
})
export class DatabaseModule {}