import { Column, DataType, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { TABLES } from "src/common/constants";
import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import { TableOptions } from "src/common/utils/sequlize.utils";


@Table(TableOptions(TABLES.MEMORY_FOLDERS, { paranoid: true }))
@Scopes(() => MemoryFolders.scopes())

export default class MemoryFolders extends PaginatedModel<MemoryFolders> {

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
    folder_name: string;

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

    static scopes(scope: string = null): any {
        const scopes = {
            list: {
                attributes: MemoryFolders.attributes()
            }
        };
        if (scope) {
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof MemoryFolders> {
        return [
            'id',
            'user_id',
            'folder_name',
            'created_on',
            'created_by',
            'updated_by',
            'updated_on'
        ]
    }

}