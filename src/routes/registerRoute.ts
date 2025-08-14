import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { addUser } from '../utils/setData.js'
import type { TUser } from "../types/UserType.js";
import { myStatusCode } from "../types/statusEnum.js";
export const registerRouter = Router();


registerRouter.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fio, email, password, dateOfBirth, role, isActivated }: TUser = req.body;

        const resFromDB = await addUser({ fio, email, password, dateOfBirth, role, isActivated });
        if(resFromDB) {
            res.status(myStatusCode.OK).json(resFromDB.data);
        } else {
            const err = new Error(`${myStatusCode.Error_On_Server_Side}`);
            next(err);
        }
    } catch (e: unknown) {
        throw new Error(`Error in registerRouter: \n ${e}`);
    }
})