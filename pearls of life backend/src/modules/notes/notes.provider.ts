import { Provider } from "@nestjs/common";
import { TABLES } from "src/common/constants";
import Notes from "./entities/notes.entity";

export const notesProvider: Provider[] = [
    {
        provide: TABLES.NOTES,
        useValue: Notes
    }
]