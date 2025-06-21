import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/users.entity").default[]>;
    findPlanByUser(user: any): Promise<import("./entities/user-plans.entity").default>;
    findOne(id: string): Promise<import("./entities/users.entity").default>;
    updatePersonalInfo(updateUserDto: UpdateUserDto, user: any): Promise<import("./entities/users.entity").default>;
    findAllUsers(page?: number, limit?: number): Promise<{
        rows: import("./entities/users.entity").default[];
        count: number;
    }>;
    updateUserRole(userId: string, role: 'user' | 'admin' | 'super_admin', admin: any): Promise<import("./entities/users.entity").default>;
    deleteUser(userId: string, admin: any): Promise<{
        message: string;
    }>;
    blockUser(userId: string, admin: any): Promise<import("./entities/users.entity").default>;
    unblockUser(userId: string, admin: any): Promise<import("./entities/users.entity").default>;
}
