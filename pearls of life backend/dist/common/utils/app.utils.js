"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessMessageResponse = void 0;
const SuccessMessageResponse = (message, data) => {
    return {
        success: true,
        message: message || '',
        data: data || null
    };
};
exports.SuccessMessageResponse = SuccessMessageResponse;
//# sourceMappingURL=app.utils.js.map