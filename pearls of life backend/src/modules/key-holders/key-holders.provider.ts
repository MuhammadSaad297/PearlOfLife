import { Provider } from "@nestjs/common";
import { TABLES } from "src/common/constants";
import KeyHolders from "./entities/key-holders.entity";

export const keyHolderProvider: Provider[] = [
    {
        provide: TABLES.KEY_HOLDERS,
        useValue: KeyHolders
    }
]