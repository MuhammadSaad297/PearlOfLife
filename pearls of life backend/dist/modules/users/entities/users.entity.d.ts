import { Model } from 'sequelize-typescript';
export default class Users extends Model {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    hashed_password: string;
    username: string;
    phone_number: string;
    address: string;
    permanent_address: string;
    date_of_birth: Date;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    deleted_on: Date;
    deleted_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof Users>;
}
