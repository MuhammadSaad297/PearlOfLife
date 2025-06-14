import { Provider } from "@nestjs/common";
import { TABLES } from "src/common/constants";
import Credentials from "./entities/credentials.entity";

export const credentialProvider: Provider[] = [
    {
        provide: TABLES.CREDENTIALS,
        useValue: Credentials
    }
]