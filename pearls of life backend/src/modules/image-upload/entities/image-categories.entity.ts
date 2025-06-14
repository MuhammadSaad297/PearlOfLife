 import { Column, DataType, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { TABLES } from "src/common/constants";
import { PaginatedModel } from "src/common/providers/paginated-model.provider";
import { TableOptions } from "src/common/utils/sequlize.utils";

@Table(TableOptions(TABLES.IMAGE_CATEGORIES, {paranoid: true}))
@Scopes(() => ImageCategories.scopes())

export default class ImageCategories extends PaginatedModel<ImageCategories> {
    
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
    name: string;
    
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

    static scopes(scope: string = null):any {
        const scopes = {
            list: {
                attributes: ImageCategories.attributes()
            }
        };
        if(scope){
            return scopes[scope] || {};
        }
        return scopes;
    }

    static attributes(): Array<keyof ImageCategories>{
        return [
            'id',
            'name',
            'created_on',
            'created_by'
        ]
    }

}