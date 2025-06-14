import { Inject, Injectable } from '@nestjs/common';
import { PAGINATE_CONDITION, TABLES } from 'src/common/constants';
import Notes from './entities/notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';
import { PaginatedModel, PaginatedOptions } from 'src/common/providers/paginated-model.provider';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { Op } from 'sequelize';

@Injectable()
export class NotesService {
    constructor(
        @Inject(TABLES.NOTES)
        private readonly notesRepository: typeof Notes
    ){}

    // async findAll(
    //     pageOptions: FilterNotesDto
    // ): Promise<PaginateDto<Notes>> {

    //     let condition = PAGINATE_CONDITION;
    //     if(pageOptions?.heading){
    //         condition['heading'] = {[Op.like]: `%${pageOptions.heading}%`}
    //     }
    //     const params: PaginatedOptions = {
    //         pagination: pageOptions.pagination,
    //         page: pageOptions.page,
    //         pageSize: pageOptions.pageSize,
    //         attributes: Notes.attributes(),
    //         order:[[pageOptions.order_key || 'updated_on', pageOptions.order]],
    //         where: condition,
    //         scopes: []
    //     }
    //     const notes = await this.notesRepository.paginate(params);
    //     return notes;

    // }

    async findAll(
        pageOptions: FilterNotesDto,
        user_id: string
    ): Promise<PaginateDto<Notes>> {

        let condition = { 
            user_id,
            deleted_on: null
        };

        if(pageOptions?.heading){
            condition['heading'] = {[Op.like]: `%${pageOptions.heading}%`}
        }

        if(pageOptions?.year){
            condition['note_date'] = {
                [Op.gte]: new Date(`${+pageOptions.year}-01-01`),  // Start of the year
                [Op.lt]: new Date(`${+pageOptions.year + 1}-01-01`),  // Start of next year
            }
        }
        
        const params: PaginatedOptions = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: Notes.attributes(),
            order:[[pageOptions.order_key || 'note_date', pageOptions.order]],
            where: condition,
            scopes: ['list']
        }
        const notes = await this.notesRepository.paginate(params);
        return notes;

    }

    async findOne(id: string): Promise<Notes> {
        const note = await this.notesRepository.findOne<Notes>({
            where: {
                deleted_on: null,
                id
            }
        });
        return note;
    }

    async create(input: CreateNoteDto, created_by: string): Promise<Notes> { 
        const note = await this.notesRepository.create<Notes>({...input, created_by: created_by});
        return note;
    }

    async update(input: UpdateNoteDto, id: string, user_id: string): Promise<Notes> { 
        const note = await this.notesRepository.update({
            ...input,
            updated_on: new Date(),
            updated_by: user_id
        },{
            where: {
                id
            },
            returning: true
        });
        return note?.[1]?.[0]?.dataValues;
    }

    async delete(id: string, user_id){
        await this.notesRepository.update({
            deleted_on: new Date(),
            deleted_by: user_id
        },{
            where: {
                id
            }
        });
    }

}
