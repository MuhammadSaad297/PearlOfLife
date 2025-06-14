import { Model } from "sequelize-typescript";
import Users from "./users.entity";
export default class UserPlans extends Model {
    id: string;
    user_id: string;
    users: Users;
    plan_id: string;
    is_active: boolean;
    created_on: Date;
    created_by: string;
    updated_on: Date;
    updated_by: string;
    static scopes(scope?: string): any;
    static attributes(): Array<keyof UserPlans>;
}
