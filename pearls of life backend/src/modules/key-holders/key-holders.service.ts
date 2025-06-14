import { Inject, Injectable } from '@nestjs/common';
import { generateRandomAlphanumeric, TABLES, TOKEN_PIN_LENGTH, TOKEN_URL_LENGTH } from 'src/common/constants';
import KeyHolders from './entities/key-holders.entity';
import { PaginatedOptions } from 'src/common/providers/paginated-model.provider';
import { Op } from 'sequelize';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { FilterKeyHoldersDto } from './dtos/filter-key-holders.dto';
import { CreateKeyHolderDto } from './dtos/create-key-holder.dto';
import { KeyHolderLoginDto } from '../auth/dtos/keyholder-login.dto';

@Injectable()
export class KeyHoldersService {

    constructor(
        @Inject(TABLES.KEY_HOLDERS)
        private readonly keyHoldersRepository: typeof KeyHolders
    ) { }

    async findAll(
        pageOptions: FilterKeyHoldersDto,
        user_id: string
    ): Promise<PaginateDto<KeyHolders>> {

        let condition = {
            user_id,
            deleted_on: null
        };

        const params: PaginatedOptions = {
            pagination: pageOptions.pagination,
            page: pageOptions.page,
            pageSize: pageOptions.pageSize,
            attributes: KeyHolders.attributes(),
            order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
            where: condition,
            scopes: ['list']
        }
        const keyHolders = await this.keyHoldersRepository.paginate(params);
        return keyHolders;

    }

    async create(input: CreateKeyHolderDto, created_by: string): Promise<KeyHolders> {
        const token_url = generateRandomAlphanumeric(TOKEN_URL_LENGTH);
        const pin = generateRandomAlphanumeric(TOKEN_PIN_LENGTH)
        const keyHolder = await this.keyHoldersRepository.create<KeyHolders>({ ...input, created_by, token_url, pin });
        return keyHolder;
    }

    async updateKeyHolderImage(id, image_path, updated_by) {
        const keyHolder = await this.keyHoldersRepository.update({
            image_path: image_path,
            updated_on: new Date(),
            updated_by: updated_by
        }, {
            where: {
                id
            },
            returning: true
        });
        return keyHolder?.[1]?.[0]?.dataValues;
    }

    async findOne(id: string): Promise<KeyHolders> {
        const keyHolder = await this.keyHoldersRepository
            .scope(['list'])
            .findOne<KeyHolders>({
                where: {
                    deleted_on: null,
                    id
                }
            });
        return keyHolder;
    }

    async findOneByTokenURL(token_url: string): Promise<KeyHolders> {
        const keyHolder = await this.keyHoldersRepository
            .scope(['list'])
            .findOne<KeyHolders>({
                where: {
                    deleted_on: null,
                    token_url
                }
            });
        return keyHolder;
    }

    async findOneByTokenAndPin(creds: KeyHolderLoginDto): Promise<KeyHolders> {
        const keyHolder = await this.keyHoldersRepository
            .scope(['list'])
            .findOne<KeyHolders>({
                where: {
                    deleted_on: null,
                    token_url: creds.token_url,
                    pin: creds.pin
                }
            });
        return keyHolder;
    }

    async delete(id: string, user_id) {
        await this.keyHoldersRepository.update({
            deleted_on: new Date(),
            deleted_by: user_id
        }, {
            where: {
                id
            }
        });
    }

}
