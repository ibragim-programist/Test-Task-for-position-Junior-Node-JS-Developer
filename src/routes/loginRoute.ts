import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { checkExistUser } from '../utils/getData.js'
import type { loginBodyType } from '../types/loginBody.js';
import { myStatusCode } from "../types/statusEnum.js";
export const loginRouter = Router();


loginRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: loginBodyType = req.body;

        const resFromDB = await checkExistUser(email, password);
        if(resFromDB) {
            res.status(myStatusCode.OK).json(resFromDB.data);
        } else {
            const err = new Error(`${myStatusCode.Not_Found}`)
            next(err);
        }
    } catch (e: unknown) {
        throw new Error(`Error in loginRouter: \n ${e}`);
    }

    
})