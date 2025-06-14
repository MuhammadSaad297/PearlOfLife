"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoryFolderProvider = void 0;
const constants_1 = require("../../common/constants");
const memory_folders_entity_1 = require("./entities/memory-folders.entity");
const memories_entity_1 = require("./entities/memories.entity");
exports.memoryFolderProvider = [
    {
        provide: constants_1.TABLES.MEMORY_FOLDERS,
        useValue: memory_folders_entity_1.default
    },
    {
        provide: constants_1.TABLES.MEMORIES,
        useValue: memories_entity_1.default
    }
];
//# sourceMappingURL=memories.provider.js.map