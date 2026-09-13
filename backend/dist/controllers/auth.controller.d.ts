import type { NextFunction, Request, Response } from "express";
export declare const authController: {
    signUp(req: Request, res: Response, next: NextFunction): Promise<void>;
    signIn(req: Request, res: Response, next: NextFunction): Promise<void>;
    refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map