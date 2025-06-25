import { TABLES } from 'src/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import Users from './entities/users.entity';
import { LoginDto } from '../auth/dtos/login.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import UserPlans from './entities/user-plans.entity';
import { generateRandom4Digit } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(TABLES.USERS)
    private readonly usersRepository: typeof Users,
    @Inject(TABLES.USERPLANS)
    private readonly userPlansRepository: typeof UserPlans,
  ) {}

  async validateUserCredentials(loginDto: LoginDto): Promise<Users> {
    const user = await this.usersRepository.findOne<Users>({
      where: {
        email: loginDto.email,
        hashed_password: loginDto.hashed_password,
      },
    });
    return user;
  }

  async create(input: any) {
    const rndmNo = generateRandom4Digit();
    return await this.usersRepository.create({
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      username: `${input.first_name}_${rndmNo}`,
      hashed_password: input.hashed_password,
      phone_number: input?.phone_number || null,
      date_of_birth: input?.date_of_birth || null,
    });
  }

  async findAll(): Promise<Users[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.usersRepository.scope(['list']).findOne<Users>({
      where: { id },
    });
    return user;
  }

  async update(
    input: UpdateUserDto,
    id: string,
    updated_by: string = null,
  ): Promise<Users> {
    const user = await this.usersRepository.update(
      {
        ...input,
        updated_on: new Date(),
        updated_by: updated_by || id,
      },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return user?.[1]?.[0]?.dataValues;
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne<Users>({
      where: { email },
    });
    return user;
  }

  async getPersonalInfo(id: string): Promise<Users> {
    const user = await this.usersRepository
      .scope(['personal_info'])
      .findOne<Users>({
        where: { id },
      });
    return user;
  }

  async findPlanByUser(user_id: string): Promise<UserPlans> {
    const user_plan = await this.userPlansRepository
      .scope(['full360'])
      .findOne<UserPlans>({
        where: { user_id },
      });
    return user_plan;
  }

  async updateResetToken(
    userId: string,
    resetToken: string,
    resetTokenExpiry: Date,
  ): Promise<void> {
    await this.usersRepository.update(
      {
        reset_token: resetToken,
        reset_token_expiry: resetTokenExpiry,
      },
      {
        where: { id: userId },
      },
    );
  }

  async findAllUsers(page: number = 1, limit: number = 10) {
    return await this.usersRepository.findAndCountAll<Users>({
      where: {
        role: 'user',
        deleted_on: null,
      },
      limit,
      offset: (page - 1) * limit,
      // attributes: [...Users.attributes(), 'role'],
    });
  }

  async updateUserRole(userId: string, role: 'user' | 'admin' | 'super_admin') {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }
    await this.usersRepository.update({ role }, { where: { id: userId } });
    return this.findOne(userId);
  }

  async deleteUser(userId: string, deletedBy: string) {
    return await this.usersRepository.update(
      {
        deleted_on: new Date(),
        deleted_by: deletedBy,
      },
      {
        where: { id: userId },
      },
    );
  }

  async blockUser(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }
    await this.usersRepository.update(
      { is_active: false },
      { where: { id: userId } },
    );
    return this.findOne(userId);
  }

  async unblockUser(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      return null;
    }
    await this.usersRepository.update(
      { is_active: true },
      { where: { id: userId } },
    );
    return this.findOne(userId);
  }
}
