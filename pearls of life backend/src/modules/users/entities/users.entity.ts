import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { TABLES } from 'src/common/constants';
import { TableOptions } from 'src/common/utils/sequlize.utils';

@Table(TableOptions(TABLES.USERS, { paranoid: false }))
@Scopes(() => Users.scopes())
export default class Users extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.ENUM('user', 'admin', 'super_admin'),
    defaultValue: 'user',
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  permanent_address: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date_of_birth: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_email_verified: boolean;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_phone_verified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_on: Date;

  @Column({
    type: DataType.UUIDV4,
  })
  created_by: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updated_on: Date;

  @Column({
    type: DataType.UUIDV4,
  })
  updated_by: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  deleted_on: Date;

  @Column({
    type: DataType.UUIDV4,
  })
  deleted_by: string;

  static scopes(scope: string = null): any {
    const scopes = {
      list: {
        attributes: Users.attributes(),
      },
      personal_info: {
        attributes: [...Users.attributes(), 'hashed_password'],
      },
    };
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }
  static attributes(): Array<keyof Users> {
    return [
      'id',
      'role',
      'first_name',
      'last_name',
      'email',
      'address',
      'permanent_address',
      'username',
      'phone_number',
      'date_of_birth',
      'is_email_verified',
      'is_phone_verified',
      'created_on',
      'updated_on',
    ];
  }
}
