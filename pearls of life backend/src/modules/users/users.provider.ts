import { Provider } from "@nestjs/common";
import { TABLES } from "src/common/constants";
import Users from "./entities/users.entity";
import UserPlans from "./entities/user-plans.entity";

export const usersProvider: Provider[] = [
    {
        provide: TABLES.USERS,
        useValue: Users
    },
    {
        provide: TABLES.USERPLANS,
        useValue: UserPlans
    }
]