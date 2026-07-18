import { NextFunction, Request, Response } from "express";
import { auth } from "../../lib/auth";


export enum UserRole {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN",
}


export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Session Token Verification
      // const sessionToken =
      //   req.cookies["__Secure-session_token"] || req.cookies["session_token"];
      const session = await auth.api.getSession({
        headers: req.headers as any
      })
      
      if (!session) {
        throw new Error("Unauthorized access! No session token provided.");
      }

      // ======================= VERIFY COOKIE =======================
      if(!session.user.emailVerified){throw new Error("Email verification required")}

      // ======================= VERIFY USER ACCESS AND OTHERS =======================
      req.user = session.user

      // ======================= VERIFY USER ROLE  =======================
      if(authRoles.length && !authRoles.includes(req.user.role)){
        return res.status(403).json({
          success: false,
          message: "you have not permission access this resource"
        })
      }
      

      next();
    } catch (error: any) {
      next(error);
    }
  };
