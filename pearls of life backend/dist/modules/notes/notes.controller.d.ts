import { NotesService } from './notes.service';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import Notes from './entities/notes.entity';
import { FilterNotesDto } from './dto/filter-notes.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    findAll(filterNotesDto: FilterNotesDto, user: any): Promise<PaginateDto<Notes>>;
    findAllByUserId(filterNotesDto: FilterNotesDto, user_id: string): Promise<PaginateDto<Notes>>;
    findOne(id: string): Promise<Notes>;
    create(input: CreateNoteDto, user: any): Promise<ResponseMessageOutput>;
    update(id: string, input: UpdateNoteDto, user: any): Promise<ResponseMessageOutput>;
    delete(id: string, user: any): Promise<ResponseMessageOutput>;
}
