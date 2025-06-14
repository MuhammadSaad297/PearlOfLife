import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { notesProvider } from './notes.provider';

@Module({
  controllers: [NotesController],
  providers: [
    NotesService, 
    ...notesProvider
  ]
})
export class NotesModule {}
