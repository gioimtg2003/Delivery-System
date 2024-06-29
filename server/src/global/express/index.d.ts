import * as express from "express";

declare global {
    namespace Express {
        interface Request<
            P = core.ParamsDictionary,
            ResBody = any,
            ReqBody = any,
            ReqQuery = core.Query,
            Locals extends Record<string, any> = Record<string, any>
        > extends core.Request<P, ResBody, ReqBody, ReqQuery, Locals> {
            user?: {
                id: number;
                role?: string;
                email: string;
            };
        }
    }
}
