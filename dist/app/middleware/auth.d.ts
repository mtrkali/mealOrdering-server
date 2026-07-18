import { NextFunction, Request, Response } from "express";
export declare enum UserRole {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN"
}
export declare const checkAuth: (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.d.ts.map