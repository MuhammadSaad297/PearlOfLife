import { Body, Controller, Get, NotFoundException, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGraud } from 'src/common/guards/auth.guard';
import { MESSAGE } from 'src/common/constants';

@UseGuards(AuthGraud)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get('/plan')
    async findPlanByUser(@CurrentUser() user: any) {
        const user_plan = await this.usersService.findPlanByUser(
            user.user_id
        )
        if (!user_plan) {
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND)
        }
        return user_plan;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(
            id
        )
        if (!user) {
            throw new NotFoundException(MESSAGE.DATA_NOT_FOUND)
        }
        return user;
    }
    // @Put()
    // async updatePersonalInfo(
    //     @Body() updateUserDto: UpdateUserDto,
    //     @CurrentUser() user: any
    // ){
    //     const userDetails = await this.usersService.updatePersonalInfo(updateUserDto, user.id);
    //     return userDetails;
    // }

}
