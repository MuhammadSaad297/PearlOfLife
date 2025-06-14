import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
export declare const databaseProvider: {
    provide: string;
    useFactory: (configService: ConfigService) => Promise<Sequelize>;
    inject: (typeof ConfigService)[];
}[];
