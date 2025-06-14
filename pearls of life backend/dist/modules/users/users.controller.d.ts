import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/users.entity").default[]>;
    findPlanByUser(user: any): Promise<import("./entities/user-plans.entity").default>;
    findOne(id: string): Promise<import("./entities/users.entity").default>;
}
