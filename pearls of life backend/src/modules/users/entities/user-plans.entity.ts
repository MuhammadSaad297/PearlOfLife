import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import Users from "./users.entity";
import { TABLES } from "src/common/constants";
import { TableOptions } from "src/common/utils/sequlize.utils";

@Table(TableOptions(TABLES.USERPLANS, { paranoid: false }))
@Scopes(() => UserPlans.scopes())

export default class UserPlans extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.UUID,
    })
    user_id: string;

    @BelongsTo(() => Users, 'user_id')
    users: Users;

    @Column({
        type: DataType.UUID,
    })
    plan_id: string;

    @Column({
        type: DataType.BOOLEAN
    })
    is_active: boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    created_on: Date;

    @Column({
        type: DataType.STRING
    })
    created_by: string;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    updated_on: Date;

    @Column({
        type: DataType.STRING
    })
    updated_by: string;

    static scopes(scope: string = null): any {
        const scopes = {
            list: {
                attributes: UserPlans.attributes()
            },
            full360: {
                attributes: UserPlans.attributes(),
            }
        };
        if (scope) {
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof UserPlans> {
        return [
            'id',
            'user_id',
            'plan_id',
            'is_active',
            'created_on',
            'created_by',
            'updated_on',
            'updated_by'
        ]
    }
}