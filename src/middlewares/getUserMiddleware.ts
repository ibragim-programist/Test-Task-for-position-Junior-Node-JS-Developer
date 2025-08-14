import type { middlewareSignature } from '../types/middlewareSingature.js'
import { myStatusCode } from '../types/statusEnum.js';
import { fullCheckEmail } from '../validate/validate.js';
import type { getUsersBody } from '../types/getUserBody.js';


export const getUserMiddleware: middlewareSignature = async (req, res, next) => {
    const { email }: getUsersBody = req.body;

    if(fullCheckEmail(email)) {
        next();
    } else {
        const err = new Error(`${myStatusCode.Not_Accessable}`);
        next(err);
    }
}