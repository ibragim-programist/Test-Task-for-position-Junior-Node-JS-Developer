
export enum myStatusCode {
    Not_Found = 404, // «не найдено»
    UnAuthorized = 401, // «не авторизован»
    Bad_Request = 400, // «неправильный, некорректный запрос»
    Not_Accessable = 406, // «неприемлемо»
    Error_On_Server_Side = 500, // «внутренняя ошибка сервера»
    Service_UnAvaiable = 503, // «сервис недоступен»
    OK = 200, // «хорошо»
    Created = 201, // «создано»
    Payload_Too_Large = 413, // «полезная нагрузка слишком велика»
    Forbidden = 403 // «запрещено (не уполномочен)»
}
