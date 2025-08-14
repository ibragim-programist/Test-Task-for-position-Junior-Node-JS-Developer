import type { middlewareSignature } from '../types/middlewareSingature.js'
import { fullCheckEmail, fullCheckPassword, fullCheckDateOfBirth, fullCheckFIO, fullCheckRole } from '../validate/validate.js'
import type { loginBodyType } from '../types/loginBody.js';
import type { TUser } from '../types/UserType.js';
import { myStatusCode } from '../types/statusEnum.js';

export const registerMiddleware: middlewareSignature = async (req, res, next) => {
    const { fio, email, password, dateOfBirth, role, isActivated }: TUser = req.body;

    if(fullCheckEmail(email) && fullCheckPassword(password) && fullCheckDateOfBirth(dateOfBirth) && fullCheckFIO(fio) && fullCheckRole(role)) {
        next();
    } else {
        const err = new Error(`${myStatusCode.Not_Accessable}`);
        next(err);
    }
}