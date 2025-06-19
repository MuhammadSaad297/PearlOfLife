import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SubscriptionPlan } from './subscription-plan.model';
import { TableOptions } from 'src/common/utils/sequlize.utils';
import { TABLES } from 'src/common/constants';
import Users from 'src/modules/users/entities/users.entity';

@Table(TableOptions(TABLES.USER_SUBSCRIPTIONS))
export class UserSubscription extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @ForeignKey(() => SubscriptionPlan)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  planId: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: 'active' | 'cancelled' | 'expired';

  @Column({
    type: DataType.STRING,
  })
  paypalSubscriptionId: string;

  @Column({
    type: DataType.STRING,
  })
  paypalOrderId: string;
}
