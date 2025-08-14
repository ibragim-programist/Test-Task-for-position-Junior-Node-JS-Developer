import type { middlewareSignature } from '../types/middlewareSingature.js'
import { fullCheckEmail, fullCheckPassword } from '../validate/validate.js'
import { myStatusCode } from '../types/statusEnum.js';
import type { loginBodyType } from '../types/loginBody.js';

export const loginMiddleware: middlewareSignature = async (req, res, next) => {
    const { email, password }: loginBodyType = req.body;

    if(fullCheckEmail(email) && fullCheckPassword(password)) {
        next();
    } else {
        const err = new Error(`${myStatusCode.Not_Found}`);
        next(err);
    }
}