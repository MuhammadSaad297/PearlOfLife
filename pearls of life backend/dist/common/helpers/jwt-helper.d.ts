export declare class JwtHelper {
    verifyToken(token: string): Promise<any>;
    generateToken(user_id: string, is_keyholder?: boolean, role?: string, session_id?: string): any;
}
