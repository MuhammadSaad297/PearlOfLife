export declare const databaseConfig: {
    development: {
        dialect: string;
        database: string;
        dialectModule: any;
        dialectOptions: {
            options: {
                useUTC: boolean;
                dateFirst: number;
                encrypt: boolean;
                trustServerCertificate: boolean;
                integratedSecurity: boolean;
                trustedConnection: boolean;
                enableArithAbort: boolean;
                instanceName: string;
                server: string;
                port: number;
                database: string;
                requestTimeout: number;
                connectTimeout: number;
                rowCollectionOnRequestCompletion: boolean;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
    };
    test: {
        dialect: string;
        database: string;
        dialectModule: any;
        dialectOptions: {
            options: {
                useUTC: boolean;
                dateFirst: number;
                encrypt: boolean;
                trustServerCertificate: boolean;
                integratedSecurity: boolean;
                trustedConnection: boolean;
                enableArithAbort: boolean;
                instanceName: string;
                server: string;
                port: number;
                database: string;
                requestTimeout: number;
                connectTimeout: number;
                rowCollectionOnRequestCompletion: boolean;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
    };
    production: {
        dialect: string;
        database: string;
        dialectModule: any;
        dialectOptions: {
            options: {
                useUTC: boolean;
                dateFirst: number;
                encrypt: boolean;
                trustServerCertificate: boolean;
                integratedSecurity: boolean;
                trustedConnection: boolean;
                enableArithAbort: boolean;
                instanceName: string;
                server: string;
                port: number;
                database: string;
                requestTimeout: number;
                connectTimeout: number;
                rowCollectionOnRequestCompletion: boolean;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
    };
};
