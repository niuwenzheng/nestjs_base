import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdSchema } from './id.schema';
import { IdService } from './id.service';
@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://148.70.247.183:27017/test_my', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      user: 'test',
      pass: '123456'
    }),
    MongooseModule.forFeature([{ name: 'Id', schema: IdSchema }])
  ],
  providers: [IdService],
  exports: [IdService]
})
export class DatabaseModule {}