import { Inject, Injectable } from '@nestjs/common';
import { TABLES } from 'src/common/constants';
import { PaginateDto } from 'src/common/dtos/paginate.dto';
import { PaginatedOptions } from 'src/common/providers/paginated-model.provider';
import { CreateObituaryInfoDto } from './dtos/create-obituary-info.dto';
import { FilterObituaryInfoDto } from './dtos/filter-obituary-info.dto';
import ObituaryInfo from './entities/obituary-info.entity';
import { Op } from 'sequelize';
@Injectable()
export class ObituaryInfoService {
  constructor(
    @Inject(TABLES.OBITUARY_INFO)
    private readonly obituaryInfoRepository: typeof ObituaryInfo,
  ) {}

  async findAll(
    pageOptions: FilterObituaryInfoDto,
    user_id: string,
  ): Promise<PaginateDto<ObituaryInfo>> {
    let condition = {
      user_id,
      deleted_on: null,
    };
    if (pageOptions?.year) {
      condition['birth_date'] = {
        [Op.gte]: new Date(`${+pageOptions.year}-01-01`), // Start of the year
        [Op.lt]: new Date(`${+pageOptions.year + 1}-01-01`), // Start of next year
      };
    }

    const params: PaginatedOptions = {
      pagination: pageOptions.pagination,
      page: pageOptions.page,
      pageSize: pageOptions.pageSize,
      attributes: ObituaryInfo.attributes(),
      order: [[pageOptions.order_key || 'updated_on', pageOptions.order]],
      where: condition,
      scopes: ['list'],
    };
    return await this.obituaryInfoRepository.paginate(params);
  }

  async findOne(id: string): Promise<ObituaryInfo> {
    return await this.obituaryInfoRepository
      .scope(['list'])
      .findOne<ObituaryInfo>({
        where: {
          deleted_on: null,
          id,
        },
      });
  }

  async create(
    input: CreateObituaryInfoDto,
    created_by: string,
  ): Promise<ObituaryInfo> {
    return await this.obituaryInfoRepository.create<ObituaryInfo>({
      ...input,
      created_by,
    });
  }

  async update(
    id: string,
    input: Partial<CreateObituaryInfoDto>,
    updated_by: string,
  ): Promise<[number, ObituaryInfo[]]> {
    return await this.obituaryInfoRepository.update(
      {
        ...input,
        updated_by,
        updated_on: new Date(),
      },
      {
        where: { id },
        returning: true,
      },
    );
  }

  async delete(id: string, user_id: string): Promise<void> {
    await this.obituaryInfoRepository.update(
      {
        deleted_on: new Date(),
        deleted_by: user_id,
      },
      {
        where: { id },
      },
    );
  }
}
