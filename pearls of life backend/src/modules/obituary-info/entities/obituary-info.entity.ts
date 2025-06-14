import { MAX } from 'class-validator';
import {
  Column,
  DataType,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { TABLES } from 'src/common/constants';
import { PaginatedModel } from 'src/common/providers/paginated-model.provider';
import { TableOptions } from 'src/common/utils/sequlize.utils';

@Table(TableOptions(TABLES.OBITUARY_INFO, { paranoid: true }))
@Scopes(() => ObituaryInfo.scopes())
export default class ObituaryInfo extends PaginatedModel<ObituaryInfo> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.STRING,
  })
  birth_name: string;

  @Column({
    type: DataType.STRING,
  })
  married_name: string;

  @Column({
    type: DataType.STRING,
  })
  current_name: string;

  @Column({
    type: DataType.DATE,
  })
  birth_date: Date;

  @Column({
    type: DataType.STRING,
  })
  birth_place: string;

  @Column({
    type: DataType.STRING,
  })
  parent_names: string;

  @Column({
    type: DataType.STRING,
  })
  spouse_name: string;

  @Column({
    type: DataType.STRING(MAX),
    get() {
      const rawValue = this.getDataValue('children');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('children', JSON.stringify(value));
    },
  })
  children: {
    name: string;
    dateOfBirth: Date;
  }[];

  @Column({
    type: DataType.STRING(MAX),
    get() {
      const rawValue = this.getDataValue('siblings');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('siblings', JSON.stringify(value));
    },
  })
  siblings: {
    name: string;
    isAlive: boolean;
  }[];

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_on: Date;

  @Column({
    type: DataType.UUID,
  })
  created_by: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_on: Date;

  @Column({
    type: DataType.UUID,
  })
  updated_by: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_on: Date;

  @Column({
    type: DataType.UUID,
  })
  deleted_by: string;

  static scopes(scope: string = null): any {
    const scopes = {
      list: {
        attributes: ObituaryInfo.attributes(),
      },
    };
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }

  static attributes(): Array<keyof ObituaryInfo> {
    return [
      'id',
      'user_id',
      'birth_name',
      'married_name',
      'current_name',
      'birth_date',
      'birth_place',
      'parent_names',
      'spouse_name',
      'children',
      'siblings',
      'created_on',
      'created_by',
      'updated_by',
      'updated_on',
    ];
  }
}
