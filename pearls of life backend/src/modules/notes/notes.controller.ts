import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { SuccessMessageResponse } from 'src/common/utils/app.utils';
import { ResponseMessageOutput } from 'src/common/interface/output-response.interface';
import { MESSAGE } from 'src/common/constants';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import Notes from './entities/notes.entity';
import { FilterNotesDto } from './dto/filter-notes.dto';
import { AuthGraud } from 'src/common/guards/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseGuards(AuthGraud)
@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @Get()
    findAll(
        @Query() filterNotesDto: FilterNotesDto,
        @CurrentUser() user: any
    ) {
        return this.notesService.findAll(filterNotesDto, user.user_id);
    }

    @Get('user/:user_id')
    findAllByUserId(
        @Query() filterNotesDto: FilterNotesDto,
        @Param('user_id') user_id: string
    ): Promise<PaginateDto<Notes>> {
        return this.notesService.findAll(filterNotesDto, user_id);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
    ) {
        const user = await this.notesService.findOne(id);
        if(!user){
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND);
        }
        return user;
    }

    @Post()
    async create(
        @Body() input: CreateNoteDto,
        @CurrentUser() user: any
    ) : Promise<ResponseMessageOutput> {
        if(!input?.user_id){
            input['user_id'] = user.user_id;
        }
        const note = await this.notesService.create(input, user.user_id);
        return SuccessMessageResponse(MESSAGE.RECORD_CREATED_SUCCESSFULLY, note);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() input: UpdateNoteDto,
        @CurrentUser() user: any
    ): Promise<ResponseMessageOutput> {
        const isNoteExists = await this.notesService.findOne(id);
        if(!isNoteExists) {
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND);
        }
        const updatedNote = await this.notesService.update(input, id, user.user_id);
        return SuccessMessageResponse(MESSAGE.RECORD_UPDATED_SUCCESSFULLY, updatedNote);
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @CurrentUser() user: any
    ): Promise<ResponseMessageOutput> {
        const isNoteExists = await this.notesService.findOne(id);
        if(!isNoteExists) {
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND);
        }
        this.notesService.delete(id, user.user_id);
        return SuccessMessageResponse(MESSAGE.RECORD_DELETED_SUCCESSFULLY);
    }

}
