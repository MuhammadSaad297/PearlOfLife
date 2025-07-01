export declare const DB_CONFIG: {
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
declare const _default: (() => {
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
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
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
}>;
export default _default;
