import type { errorMiddlewareSignature } from '../types/middlewareSingature.js'
import { myStatusCode } from '../types/statusEnum.js'


export const errorMiddleware: errorMiddlewareSignature = async (err, req, res, next) => {
    switch(err.message) {
        case `${myStatusCode.Bad_Request}`:
            res.status(myStatusCode.Bad_Request).json(`Error ${myStatusCode.Bad_Request}, Bad Request ( Некорректный Запрос )`)
            break;
        case `${myStatusCode.Error_On_Server_Side}`:
            res.status(myStatusCode.Error_On_Server_Side).json(`Error ${myStatusCode.Error_On_Server_Side}, Error on Server Side ( Ошибка На Стороне Сервера )`)
            break;
        case `${myStatusCode.Forbidden}`:
            res.status(myStatusCode.Forbidden).json(`Error ${myStatusCode.Forbidden}, Not Allowed ( Доступ Запрещен )`)
            break;
        case `${myStatusCode.Not_Accessable}`:
            res.status(myStatusCode.Not_Accessable).json(`Error ${myStatusCode.Not_Accessable}, Not Accessable ( Неприемлимые Данные )`)
            break;
        case `${myStatusCode.Not_Found}`:
            res.status(myStatusCode.Not_Found).json(`Error ${myStatusCode.Not_Found}, Not Found ( Не Найдено )`)
            break;
        case `${myStatusCode.Payload_Too_Large}`:
            res.status(myStatusCode.Payload_Too_Large).json(`Error ${myStatusCode.Payload_Too_Large}, Payload To Large ( Больший Объем Данных, Чем Нужно Было )`)
            break;
        case `${myStatusCode.Service_UnAvaiable}`:
            res.status(myStatusCode.Service_UnAvaiable).json(`Error ${myStatusCode.Service_UnAvaiable}, Service UnAvailable ( Сервис Не Доступен )`)
            break;
        case `${myStatusCode.UnAuthorized}`:
            res.status(myStatusCode.UnAuthorized).json(`Error ${myStatusCode.UnAuthorized}, UnAuthorized ( Не Авторизован )`)
            break;
    }
}