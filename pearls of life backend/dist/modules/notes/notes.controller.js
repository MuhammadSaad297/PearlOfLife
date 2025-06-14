"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
const app_utils_1 = require("../../common/utils/app.utils");
const constants_1 = require("../../common/constants");
const create_note_dto_1 = require("./dto/create-note.dto");
const update_note_dto_1 = require("./dto/update.note.dto");
const filter_notes_dto_1 = require("./dto/filter-notes.dto");
const auth_guard_1 = require("../../common/guards/auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let NotesController = class NotesController {
    constructor(notesService) {
        this.notesService = notesService;
    }
    findAll(filterNotesDto, user) {
        return this.notesService.findAll(filterNotesDto, user.user_id);
    }
    findAllByUserId(filterNotesDto, user_id) {
        return this.notesService.findAll(filterNotesDto, user_id);
    }
    async findOne(id) {
        const user = await this.notesService.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        return user;
    }
    async create(input, user) {
        if (!input?.user_id) {
            input['user_id'] = user.user_id;
        }
        const note = await this.notesService.create(input, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_CREATED_SUCCESSFULLY, note);
    }
    async update(id, input, user) {
        const isNoteExists = await this.notesService.findOne(id);
        if (!isNoteExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        const updatedNote = await this.notesService.update(input, id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_UPDATED_SUCCESSFULLY, updatedNote);
    }
    async delete(id, user) {
        const isNoteExists = await this.notesService.findOne(id);
        if (!isNoteExists) {
            throw new common_1.NotFoundException(constants_1.MESSAGE.DATA_NOT_FOUND);
        }
        this.notesService.delete(id, user.user_id);
        return (0, app_utils_1.SuccessMessageResponse)(constants_1.MESSAGE.RECORD_DELETED_SUCCESSFULLY);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_notes_dto_1.FilterNotesDto, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:user_id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_notes_dto_1.FilterNotesDto, String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "findAllByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_note_dto_1.UpdateNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "delete", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGraud),
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map