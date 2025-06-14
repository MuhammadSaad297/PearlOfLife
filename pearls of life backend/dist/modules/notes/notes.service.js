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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../common/constants");
const notes_entity_1 = require("./entities/notes.entity");
const sequelize_1 = require("sequelize");
let NotesService = class NotesService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    async findAll(pageOptions, user_id) {
        let condition = {
            user_id,
            deleted_on: null
        };
        if (pageOptions?.heading) {
            condition['heading'] = { [sequelize_1.Op.like]: `%${pageOptions.heading}%` };
        }
        if (pageOptions?.year) {
            condition['note_date'] = {
                [sequelize_1.Op.gte]: new Date(`${+pageOptions.year}-01-01`),
                [sequelize_1.Op.lt]: new Date(`${+pageOptions.year + 1}-01-01`),
            };
        }
        const params = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: notes_entity_1.default.attributes(),
            order: [[pageOptions.order_key || 'note_date', pageOptions.order]],
            where: condition,
            scopes: ['list']
        };
        const notes = await this.notesRepository.paginate(params);
        return notes;
    }
    async findOne(id) {
        const note = await this.notesRepository.findOne({
            where: {
                deleted_on: null,
                id
            }
        });
        return note;
    }
    async create(input, created_by) {
        const note = await this.notesRepository.create({ ...input, created_by: created_by });
        return note;
    }
    async update(input, id, user_id) {
        const note = await this.notesRepository.update({
            ...input,
            updated_on: new Date(),
            updated_by: user_id
        }, {
            where: {
                id
            },
            returning: true
        });
        return note?.[1]?.[0]?.dataValues;
    }
    async delete(id, user_id) {
        await this.notesRepository.update({
            deleted_on: new Date(),
            deleted_by: user_id
        }, {
            where: {
                id
            }
        });
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TABLES.NOTES)),
    __metadata("design:paramtypes", [Object])
], NotesService);
//# sourceMappingURL=notes.service.js.map