import { Module } from '@nestjs/common';
import { ObituaryInfoController } from './obituary-info.controller';
import { ObituaryInfoService } from './obituary-info.service';
import { obituaryInfoProvider } from './obituary-info.provider';

@Module({
  controllers: [ObituaryInfoController],
  providers: [ObituaryInfoService, ...obituaryInfoProvider],
})
export class ObituaryInfoModule {}
