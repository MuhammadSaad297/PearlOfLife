"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesProvider = void 0;
const constants_1 = require("../../common/constants");
const notes_entity_1 = require("./entities/notes.entity");
exports.notesProvider = [
    {
        provide: constants_1.TABLES.NOTES,
        useValue: notes_entity_1.default
    }
];
//# sourceMappingURL=notes.provider.js.map