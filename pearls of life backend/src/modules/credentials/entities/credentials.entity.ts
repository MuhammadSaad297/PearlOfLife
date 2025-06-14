import { Column, DataType, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { TABLES } from "src/common/constants";
import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import { TableOptions } from "src/common/utils/sequlize.utils";

@Table(TableOptions(TABLES.CREDENTIALS, {paranoid: true}))
@Scopes(() => Credentials.scopes())

export default class Credentials extends PaginatedModel<Credentials> {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    user_id: string;

    @Column({
        type: DataType.STRING
    })
    domain_name: string;

    @Column({
        type: DataType.STRING,
    })
    domain_url: Date;

    @Column({
        type: DataType.STRING,
    })
    username: Date;

    @Column({
        type: DataType.STRING,
    })
    password: Date;
    
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    created_on: Date;

    @Column({
        type: DataType.UUIDV4
    })
    created_by: string;
    
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    updated_on: Date;

    @Column({
        type: DataType.UUIDV4
    })
    updated_by: string;
    
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    deleted_on: Date;

    @Column({
        type: DataType.UUIDV4
    })
    deleted_by: string;

    static scopes(scope: string = null):any {
        const scopes = {
            list: {
                attributes: Credentials.attributes()
            }
        };
        if(scope){
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof Credentials>{
        return [
            'id',
            'user_id',
            'domain_name',
            'domain_url',
            'username',
            'password',
            'created_on',
            'updated_on'
        ]
    }
    
}