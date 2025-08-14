import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { blockUser } from "../utils/setData.js";
import { myStatusCode } from "../types/statusEnum.js";
import type { blockUserBody } from "../types/blockUserBody.js";
export const blockUserRouter = Router();


blockUserRouter.post('/blockUser', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email }: blockUserBody = req.body;

        const resFromDB = await blockUser(email);
        if(resFromDB.data) {
            res.status(myStatusCode.OK).json(resFromDB.data);
        } else {
            const err = new Error(`${myStatusCode.Error_On_Server_Side}`)
            next(err);
        } 
    } catch (e: unknown) {
        throw new Error(`Error in blockUserRouter: \n ${e}`);
    }
});