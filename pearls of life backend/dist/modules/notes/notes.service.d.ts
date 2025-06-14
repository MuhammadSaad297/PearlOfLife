import Notes from './entities/notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
export declare class NotesService {
    private readonly notesRepository;
    constructor(notesRepository: typeof Notes);
    findAll(pageOptions: FilterNotesDto, user_id: string): Promise<PaginateDto<Notes>>;
    findOne(id: string): Promise<Notes>;
    create(input: CreateNoteDto, created_by: string): Promise<Notes>;
    update(input: UpdateNoteDto, id: string, user_id: string): Promise<Notes>;
    delete(id: string, user_id: any): Promise<void>;
}
