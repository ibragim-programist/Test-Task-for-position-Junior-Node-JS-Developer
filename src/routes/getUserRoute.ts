import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { myStatusCode } from "../types/statusEnum.js";
import { getUserByEmail } from "../utils/getData.js";
import type { getUsersBody } from "../types/getUserBody.js";
export const getUserRouter = Router();


getUserRouter.post('/getUser', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email }: getUsersBody = req.body;
        const resFromDB = await getUserByEmail(email);

        if(resFromDB) {
            res.status(myStatusCode.OK).json(resFromDB.data);
        } else {
            const err = new Error(`${myStatusCode.Not_Found}`);
            next(err);
        }
    } catch (e: unknown) {
        throw new Error(`Error in getUserRouter: \n ${e}`);
    }
})