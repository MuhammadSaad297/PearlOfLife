export declare const DB_CONFIG: {
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
declare const _default: (() => {
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
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
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
}>;
export default _default;
