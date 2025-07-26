export declare const TABLES: {
    USERS: string;
    NOTES: string;
    CREDENTIALS: string;
    IMAGE_DETAILS: string;
    IMAGE_CATEGORIES: string;
    IMAGE_FOLDERS: string;
    KEY_HOLDERS: string;
    PLANS: string;
    PLANSCREENS: string;
    SCREENS: string;
    USERPLANS: string;
    MEMORY_FOLDERS: string;
    MEMORIES: string;
    OBITUARY_INFO: string;
    SUBSCRIPTION_PLANS: string;
    USER_SUBSCRIPTIONS: string;
};
export declare const MESSAGE: {
    DATA_NOT_FOUND: string;
    RECORD_CREATED_SUCCESSFULLY: string;
    RECORD_UPDATED_SUCCESSFULLY: string;
    RECORD_DELETED_SUCCESSFULLY: string;
    ENTITLEMENTS: {
        USER_REGISTERED: string;
        KEYHOLDER_REGISTERED: string;
        PASSWORD_RESET_EMAIL_SENT: string;
        EMAIL_SENT: string;
    };
};
export declare enum ORDER {
    ASC = "ASC",
    DESC = "DESC"
}
export declare const PAGINATE_CONDITION: {
    deleted_on: any;
};
export declare const generateRandom4Digit: () => number;
export declare const X_ACCESS_TOKEN = "Authorization";
export declare const BEARER = "Bearer";
export declare const PROFILE_PIC_BASE_PATH = "./uploads/profile-pic";
export declare const KEY_HOLDERS_BASE_PATH = "./uploads/key-holders";
export declare const MEMORIES_BASE_PATH = "./uploads/memories";
export declare const FILE_CATEGORIES: {
    PROFILE_PIC: string;
    MEMORIES: string;
    ASSETS: string;
};
export declare const generateRandomAlphanumeric: (length: number) => string;
export declare const TOKEN_URL_LENGTH = 74;
export declare const TOKEN_PIN_LENGTH = 7;
