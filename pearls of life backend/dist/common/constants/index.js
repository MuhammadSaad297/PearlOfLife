"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_PIN_LENGTH = exports.TOKEN_URL_LENGTH = exports.generateRandomAlphanumeric = exports.FILE_CATEGORIES = exports.MEMORIES_BASE_PATH = exports.KEY_HOLDERS_BASE_PATH = exports.PROFILE_PIC_BASE_PATH = exports.BEARER = exports.X_ACCESS_TOKEN = exports.generateRandom4Digit = exports.PAGINATE_CONDITION = exports.ORDER = exports.MESSAGE = exports.TABLES = void 0;
exports.TABLES = {
    USERS: 'Users',
    NOTES: 'Notes',
    CREDENTIALS: 'Credentials',
    IMAGE_DETAILS: 'ImageDetails',
    IMAGE_CATEGORIES: 'ImageCategories',
    IMAGE_FOLDERS: 'ImageFolders',
    KEY_HOLDERS: 'KeyHolders',
    PLANS: 'Plans',
    PLANSCREENS: 'PlanScreens',
    SCREENS: 'Screens',
    USERPLANS: 'UserPlans',
    MEMORY_FOLDERS: 'MemoryFolders',
    MEMORIES: 'Memories',
    OBITUARY_INFO: 'ObituaryInfo',
    SUBSCRIPTION_PLANS: 'SubscriptionPlans',
    USER_SUBSCRIPTIONS: 'UserSubscriptions',
};
exports.MESSAGE = {
    DATA_NOT_FOUND: 'Data Not Found',
    RECORD_CREATED_SUCCESSFULLY: 'Record Created Successfully',
    RECORD_UPDATED_SUCCESSFULLY: 'Record Updated Successfully',
    RECORD_DELETED_SUCCESSFULLY: 'Record Deleted Successfully',
    ENTITLEMENTS: {
        USER_REGISTERED: 'User registered successfully',
        KEYHOLDER_REGISTERED: 'Key Holder registered successfully',
        PASSWORD_RESET_EMAIL_SENT: 'Password reset instructions have been sent to your email.',
    },
};
var ORDER;
(function (ORDER) {
    ORDER["ASC"] = "ASC";
    ORDER["DESC"] = "DESC";
})(ORDER || (exports.ORDER = ORDER = {}));
exports.PAGINATE_CONDITION = { deleted_on: null };
const generateRandom4Digit = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
exports.generateRandom4Digit = generateRandom4Digit;
exports.X_ACCESS_TOKEN = 'Authorization';
exports.BEARER = 'Bearer';
exports.PROFILE_PIC_BASE_PATH = './uploads/profile-pic';
exports.KEY_HOLDERS_BASE_PATH = './uploads/key-holders';
exports.MEMORIES_BASE_PATH = './uploads/memories';
exports.FILE_CATEGORIES = {
    PROFILE_PIC: 'Profile Picture',
    MEMORIES: 'Memories',
    ASSETS: 'Assets',
};
const generateRandomAlphanumeric = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
exports.generateRandomAlphanumeric = generateRandomAlphanumeric;
exports.TOKEN_URL_LENGTH = 74;
exports.TOKEN_PIN_LENGTH = 7;
//# sourceMappingURL=index.js.map