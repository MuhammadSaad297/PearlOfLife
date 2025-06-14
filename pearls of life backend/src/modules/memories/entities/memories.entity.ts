import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { TABLES } from "src/common/constants";
import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import { TableOptions } from "src/common/utils/sequlize.utils";
import MemoryFolders from "./memory-folders.entity";
import Users from "src/modules/users/entities/users.entity";
import ImageDetails from "src/modules/image-upload/entities/image-details.entity";


@Table(TableOptions(TABLES.MEMORIES, { paranoid: true }))
@Scopes(() => Memories.scopes())

export default class Memories extends PaginatedModel<Memories> {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false
    })
    id: string;

    @ForeignKey(() => Users)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    user_id: string;

    @ForeignKey(() => MemoryFolders)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    folder_id: string;

    @BelongsTo(() => MemoryFolders, 'folder_id')
    folder: MemoryFolders;

    @ForeignKey(() => ImageDetails)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    image_details_id;

    @BelongsTo(() => ImageDetails, 'image_details_id')
    image_details: ImageDetails;

    @Column({
        type: DataType.DATE
    })
    memory_date: Date;

    @Column({
        type: DataType.STRING
    })
    description: string;

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
                attributes: Memories.attributes()
            },
            full360: {
                attributes: Memories.attributes(),
                include: [
                    {
                        model: MemoryFolders,
                        attributes: MemoryFolders.attributes(),
                        as: 'folder',
                    },
                    {
                        model: ImageDetails,
                        attributes: ImageDetails.attributes(),
                        as: 'image_details',
                    }
                ]
            }
        };
        if (scope) {
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof Memories> {
        return [
            'id',
            'user_id',
            'folder_id',
            'image_details_id',
            'memory_date',
            'description',
            'created_on',
            'created_by',
            'updated_by',
            'updated_on'
        ]
    }

}