import { Request, Response } from "express";
export interface IDataController<T> {
    id: string;
    email?: string;
    data: T;
}
export abstract class BaseController {
    abstract Controller(req: Request, res: Response): void;
}
