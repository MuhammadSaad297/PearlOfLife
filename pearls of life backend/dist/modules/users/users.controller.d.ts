import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import Users from './entities/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Users[]>;
    findPlanByUser(user: any): Promise<import("./entities/user-plans.entity").default>;
    findOne(id: string): Promise<Users>;
    updatePersonalInfo(updateUserDto: UpdateUserDto, user: any): Promise<Users>;
    findAllUsers(page?: number, limit?: number): Promise<{
        rows: Users[];
        count: number;
    }>;
    updateUserRole(userId: string, role: 'user' | 'admin' | 'super_admin', admin: any): Promise<Users>;
    deleteUser(userId: string, admin: any): Promise<{
        message: string;
    }>;
    blockUser(userId: string, admin: any): Promise<Users>;
    unblockUser(userId: string, admin: any): Promise<Users>;
}
