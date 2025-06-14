"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadProvider = void 0;
const constants_1 = require("../../common/constants");
const image_details_entity_1 = require("./entities/image-details.entity");
const image_categories_entity_1 = require("./entities/image-categories.entity");
const image_folder_entity_1 = require("./entities/image-folder.entity");
exports.imageUploadProvider = [
    {
        provide: constants_1.TABLES.IMAGE_DETAILS,
        useValue: image_details_entity_1.default
    },
    {
        provide: constants_1.TABLES.IMAGE_CATEGORIES,
        useValue: image_categories_entity_1.default
    },
    {
        provide: constants_1.TABLES.IMAGE_FOLDERS,
        useValue: image_folder_entity_1.default
    }
];
//# sourceMappingURL=image-upload.provider.js.map