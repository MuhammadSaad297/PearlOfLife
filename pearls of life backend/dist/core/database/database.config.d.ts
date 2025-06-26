export declare const databaseConfig: {
    development: {
        dialect: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        dialectModule: any;
        dialectOptions: {
            options: {
                encrypt: boolean;
                trustServerCertificate: boolean;
                enableArithAbort: boolean;
                requestTimeout: number;
                connectTimeout: number;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
        logging: (str: any) => void;
    };
    test: {
        dialect: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        dialectModule: any;
        dialectOptions: {
            options: {
                encrypt: boolean;
                trustServerCertificate: boolean;
                enableArithAbort: boolean;
                requestTimeout: number;
                connectTimeout: number;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
        logging: (str: any) => void;
    };
    production: {
        dialect: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        dialectModule: any;
        dialectOptions: {
            options: {
                encrypt: boolean;
                trustServerCertificate: boolean;
                enableArithAbort: boolean;
                requestTimeout: number;
                connectTimeout: number;
            };
        };
        pool: {
            max: number;
            min: number;
            acquire: number;
            idle: number;
        };
        logging: (str: any) => void;
    };
};
