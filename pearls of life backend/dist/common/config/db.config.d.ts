export declare const DB_CONFIG: {
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
declare const _default: (() => {
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
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
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
}>;
export default _default;
