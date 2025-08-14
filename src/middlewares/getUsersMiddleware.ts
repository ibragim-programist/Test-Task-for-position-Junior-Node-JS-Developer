import type { middlewareSignature } from '../types/middlewareSingature.js'
import { myStatusCode } from '../types/statusEnum.js';
import { Roles } from '../types/UserType.js';
import { fullCheckRole } from '../validate/validate.js';

export const getUsersMiddleware: middlewareSignature = async (req, res, next) => {
    const { role } = req.body;
    if(fullCheckRole(role) === Roles.ADMIN) {
        next();
    } else if(fullCheckRole(role) === Roles.USER) {
        const err = new Error(`${myStatusCode.Forbidden}`);
        next(err);
    } else {
        const err = new Error(`${myStatusCode.Not_Accessable}`);
        next(err);
    }
}