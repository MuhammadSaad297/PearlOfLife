import { Column, DataType, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { TABLES } from "src/common/constants";
import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import { TableOptions } from "src/common/utils/sequlize.utils";

@Table(TableOptions(TABLES.NOTES, {paranoid: true}))
@Scopes(() => Notes.scopes())

export default class Notes extends PaginatedModel<Notes> {

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
    heading: string;

    @Column({
        type: DataType.STRING
    })
    description: string;
    
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    note_date: Date;
    
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
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
                attributes: Notes.attributes()
            }
        };
        if(scope){
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof Notes>{
        return [
            'id',
            'user_id',
            'heading',
            'description',
            'note_date',
            'created_on',
            'updated_on'
        ]
    }

}