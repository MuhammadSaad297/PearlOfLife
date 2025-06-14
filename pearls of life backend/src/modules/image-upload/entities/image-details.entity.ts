import { Column, DataType, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { TABLES } from "src/common/constants";
import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import { TableOptions } from "src/common/utils/sequlize.utils";

@Table(TableOptions(TABLES.IMAGE_DETAILS, {paranoid: true}))
@Scopes(() => ImageDetails.scopes())

export default class ImageDetails extends PaginatedModel<ImageDetails>{
    
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
        type: DataType.UUID,
        allowNull: false
    })
    image_category_id: string;

    @Column({
        type: DataType.UUID,
        allowNull: true
    })
    folder_id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image_path: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image_file_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image_ext: string;
    
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
                attributes: ImageDetails.attributes()
            }
        };
        if(scope){
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof ImageDetails>{
        return [
            'id',
            'user_id',
            'image_category_id',
            'folder_id',
            'image_path',
            'created_on',
            'updated_on',
            'deleted_by',
            'deleted_on'
        ]
    }

}