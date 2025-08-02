// import { Column, DataType, PrimaryKey, Scopes, Table } from "sequelize-typescript";
// import { TABLES } from "src/common/constants";
// import { PaginatedModel } from "src/common/providers/paginated-model.provider";
// import { TableOptions } from "src/common/utils/sequlize.utils";

// @Table(TableOptions(TABLES.KEY_HOLDERS, { paranoid: true }))
// @Scopes(() => KeyHolders.scopes())

// export default class KeyHolders extends PaginatedModel<KeyHolders> {

//     @PrimaryKey
//     @Column({
//         type: DataType.UUID,
//         defaultValue: DataType.UUIDV4,
//         allowNull: false
//     })
//     id: string;

//     @Column({
//         type: DataType.UUID,
//         allowNull: false
//     })
//     user_id: string;

//     @Column({
//         type: DataType.STRING
//     })
//     first_name: string;

//     @Column({
//         type: DataType.STRING
//     })
//     last_name: string;

//     @Column({
//         type: DataType.STRING
//     })
//     email: string;

//     @Column({
//         type: DataType.STRING
//     })
//     phone_number: string;

//     @Column({
//         type: DataType.STRING
//     })
//     address: string;

//     @Column({
//         type: DataType.STRING
//     })
//     relation: string;

//     @Column({
//         type: DataType.STRING
//     })
//     image_path: string;

//     @Column({
//         type: DataType.STRING
//     })
//     token_url: string;

//     @Column({
//         type: DataType.STRING
//     })
//     pin: string;

//     @Column({
//         type: DataType.DATE,
//         allowNull: false,
//         defaultValue: DataType.NOW
//     })
//     created_on: Date;

//     @Column({
//         type: DataType.UUIDV4
//     })
//     created_by: string;

//     @Column({
//         type: DataType.DATE,
//         allowNull: true
//     })
//     updated_on: Date;

//     @Column({
//         type: DataType.UUIDV4
//     })
//     updated_by: string;

//     @Column({
//         type: DataType.DATE,
//         allowNull: true
//     })
//     deleted_on: Date;

//     @Column({
//         type: DataType.UUIDV4
//     })
//     deleted_by: string;

//     static scopes(scope: string = null): any {
//         const scopes = {
//             list: {
//                 attributes: KeyHolders.attributes()
//             }
//         };
//         if (scope) {
//             return scopes[scope] || {};
//         }
//         return scopes;
//     }

//     static attributes(): Array<keyof KeyHolders> {
//         return [
//             'id',
//             'user_id',
//             'first_name',
//             'last_name',
//             'email',
//             'phone_number',
//             'address',
//             'relation',
//             'image_path',
//             'created_on',
//             'created_by',
//             'updated_by',
//             'updated_on'
//         ]
//     }

// }

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

@Table(TableOptions(TABLES.KEY_HOLDERS, { paranoid: true }))
@Scopes(() => KeyHolders.scopes())
export default class KeyHolders extends PaginatedModel<KeyHolders> {
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
  phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  street: string;

  @Column({
    type: DataType.STRING,
  })
  city: string;

  @Column({
    type: DataType.STRING,
  })
  state: string;

  @Column({
    type: DataType.STRING,
  })
  zip: string;

  @Column({
    type: DataType.STRING,
  })
  relation: string;

  @Column({
    type: DataType.STRING,
  })
  image_path: string;

  @Column({
    type: DataType.STRING,
  })
  token_url: string;

  @Column({
    type: DataType.STRING,
  })
  pin: string;

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
        attributes: KeyHolders.attributes(),
      },
    };
    if (scope) {
      return scopes[scope] || {};
    }
    return scopes;
  }

  static attributes(): Array<keyof KeyHolders> {
    return [
      'id',
      'user_id',
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'street',
      'city',
      'state',
      'zip',
      'relation',
      'image_path',
      'created_on',
      'created_by',
      'updated_by',
      'updated_on',
    ];
  }
}
