export declare const databaseConfig: {
    development: {
        dialect: string;
        host: string;
        database: string;
        username: string;
        password: string;
        port: number;
        dialectOptions: {
            options: {
                encrypt: boolean;
                trustServerCertificate: boolean;
                enableArithAbort: boolean;
                connectTimeout: number;
                requestTimeout: number;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
        logging: boolean | {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
    test: {
        dialect: string;
        host: string;
        database: string;
        username: string;
        password: string;
        port: number;
        dialectOptions: {
            options: {
                encrypt: boolean;
                trustServerCertificate: boolean;
                enableArithAbort: boolean;
                connectTimeout: number;
                requestTimeout: number;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
        logging: boolean | {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
    production: {
        dialect: string;
        host: string;
        database: string;
        username: string;
        password: string;
        port: number;
        dialectOptions: {
            options: {
                encrypt: boolean;
                trustServerCertificate: boolean;
                enableArithAbort: boolean;
                connectTimeout: number;
                requestTimeout: number;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
        logging: boolean | {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
};
