import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { myStatusCode } from "../types/statusEnum.js";
import { getUsers } from "../utils/getData.js";
export const getUsersRouter = Router();


getUsersRouter.get('/getUsers', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resFromDB = await getUsers();
        if(resFromDB) {
            res.status(myStatusCode.OK).json(resFromDB.data);
        } else {
            const err = new Error(`${myStatusCode.Error_On_Server_Side}`);
            next(err);
        }
    } catch (e: unknown) {
        throw new Error(`Error in getUsersRouter: \n ${e}`);
    }
    
})