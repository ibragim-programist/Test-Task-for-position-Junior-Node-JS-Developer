import type { middlewareSignature } from '../types/middlewareSingature.js'
import { fullCheckEmail } from '../validate/validate.js'
import { myStatusCode } from '../types/statusEnum.js';
import type { blockUserBody } from '../types/blockUserBody.js';

export const blockUserMiddleware: middlewareSignature = async (req, res, next) => {
    const { email }: blockUserBody = req.body;
    
    if(fullCheckEmail(email)) {
        next();
    } else {
        const err = new Error(`${myStatusCode.Not_Accessable}`);
        next(err);
    }
}