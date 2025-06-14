import { TableOptions as SequelizeTableOptions } from 'sequelize-typescript';
// import { CREATED_ON, DELETED_ON, UPDATED_ON } from '../constants';

export const TableOptions = (
  tableName: string,
  options: SequelizeTableOptions = {}
): SequelizeTableOptions => {
  const { paranoid } = options;
  const _options = {
    tableName: tableName,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    underscored: true,
    timestamps: false,
    ...options
  };
  if (paranoid) {
    return {
      ..._options,
      deletedAt: 'deleted_on'
    };
  }
  return _options;
};