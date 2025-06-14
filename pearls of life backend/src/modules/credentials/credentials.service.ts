import { Inject, Injectable } from '@nestjs/common';
import { TABLES } from 'src/common/constants';
import Credentials from './entities/credentials.entity';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { FilterCredentialsDto } from './dtos/filter-credentials.dto';
import { Op } from 'sequelize';
import { PaginatedOptions } from 'src/common/providers/paginated-model.provider';
import { CreateCredentialsDto } from './dtos/create-credentials.dto';
import { UpdateCredentialsDto } from './dtos/update-credentials.dto';

@Injectable()
export class CredentialsService {
    constructor(
        @Inject(TABLES.CREDENTIALS)
        private readonly credsRepository: typeof Credentials
    ){}

    async findAll(
        pageOptions: FilterCredentialsDto,
        user_id: string
    ): Promise<PaginateDto<Credentials>> {
        let condition = {
            user_id,
            deleted_on: null
        }

        if(pageOptions.domain_name){
            condition['domain_name'] = {[Op.like]: `%${pageOptions.domain_name}%`};
        }

        const params: PaginatedOptions = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: Credentials.attributes(),
            order:[[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['list']
        }
        const credentials = await this.credsRepository.paginate(params);
        return credentials;
    }
    
    async findOne(id: string): Promise<Credentials> {
        const note = await this.credsRepository.findOne<Credentials>({
            where: {
                id
            }
        });
        return note;
    }

    async create(input: CreateCredentialsDto, created_by: string): Promise<Credentials> { 
        const note = await this.credsRepository.create<Credentials>({...input, created_by: created_by});
        return note;
    }

    async update(input: UpdateCredentialsDto, id: string, user_id: string): Promise<Credentials> { 
        const note = await this.credsRepository.update({
            ...input,
            updated_on: new Date(),
            updated_by: user_id
        },{
            where: {
                id
            },
            returning: true
        });
        return note?.[1]?.[0]?.dataValues;
    }

    async delete(id: string, user_id){
        await this.credsRepository.update({
            deleted_on: new Date(),
            deleted_by: user_id
        },{
            where: {
                id
            }
        });
    }

}