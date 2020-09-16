import { Module, Global } from '@nestjs/common';
import { TimeToolsService } from './time-tools.service';
import { CryptoToolsService } from './crypto.service';
import { AppToolsService } from './app-tools.service';
@Global()
@Module({
  controllers: [],
  providers: [
    TimeToolsService,
    CryptoToolsService,
    AppToolsService,
  ],
  exports: [
    TimeToolsService,
    CryptoToolsService,
    AppToolsService,
  ],
})
export class AppToolsModule {}
