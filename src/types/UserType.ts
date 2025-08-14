
export enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

type TUser = {
    fio: string;
    dateOfBirth: string | Date;
    email: string;
    password: string;
    role: Roles.ADMIN | Roles.USER;
    isActivated: boolean;
}


export type { TUser };