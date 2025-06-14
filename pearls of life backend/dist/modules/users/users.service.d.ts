import Users from './entities/users.entity';
import { LoginDto } from '../auth/dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import UserPlans from './entities/user-plans.entity';
export declare class UsersService {
    private readonly usersRepository;
    private readonly userPlansRepository;
    constructor(usersRepository: typeof Users, userPlansRepository: typeof UserPlans);
    validateUserCredentials(loginDto: LoginDto): Promise<Users>;
    create(input: any): Promise<Users>;
    findAll(): Promise<Users[]>;
    findOne(id: string): Promise<Users>;
    update(input: UpdateUserDto, id: string, updated_by?: string): Promise<Users>;
    findOneByEmail(email: string): Promise<Users>;
    getPersonalInfo(id: string): Promise<Users>;
    findPlanByUser(user_id: string): Promise<UserPlans>;
    updateResetToken(userId: string, resetToken: string, resetTokenExpiry: Date): Promise<void>;
}
