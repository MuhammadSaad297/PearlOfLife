import { Provider } from '@nestjs/common';
import { TABLES } from 'src/common/constants';
import ObituaryInfo from './entities/obituary-info.entity';

export const obituaryInfoProvider: Provider[] = [
  {
    provide: TABLES.OBITUARY_INFO,
    useValue: ObituaryInfo,
  },
];
