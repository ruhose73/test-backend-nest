export declare class TokenService {
    generateToken(payload: any): Promise<{
        token: string;
        expire: string;
    }>;
    validateAccessToken(token: any): Promise<any>;
}
