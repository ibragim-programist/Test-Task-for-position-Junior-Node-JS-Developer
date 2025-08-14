import type { Request, Response, NextFunction } from "express";

type middlewareSignature = {
    (req: Request, res: Response, next: NextFunction): void;
}

type errorMiddlewareSignature = {
    (err: Error, req: Request, res: Response, next: NextFunction): void;
}

export type { middlewareSignature, errorMiddlewareSignature }