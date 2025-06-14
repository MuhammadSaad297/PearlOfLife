"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = void 0;
const fs = require("fs");
const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Folder created at: ${folderPath}`);
    }
};
exports.createFolder = createFolder;
//# sourceMappingURL=uploads.utils.js.map