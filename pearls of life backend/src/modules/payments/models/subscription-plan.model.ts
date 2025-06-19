import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { TABLES } from 'src/common/constants';
import { TableOptions } from 'src/common/utils/sequlize.utils';

@Table(TableOptions(TABLES.SUBSCRIPTION_PLANS))
export class SubscriptionPlan extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  features: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
