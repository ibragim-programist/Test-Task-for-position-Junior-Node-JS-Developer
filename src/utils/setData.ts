import fs from 'fs/promises';
import type { TUser } from '../types/UserType.js';
import { getUsers } from './getData.js';
// Если вдруг не понимаете где работа с субд или как я с ней взаимодействую, то прочитайте README.md файл 

const path = `../data/Users.txt`;

interface addUserSignature {
    ({fio, email, password, dateOfBirth, role, isActivated}: TUser): Promise<{ data: boolean }>;
}

interface blockUserSignature {
    (email: string): Promise<{ data: boolean }>;
}

async function clearFile(path: string): Promise<boolean> {
    let res: boolean = false;
    await fs.truncate(path, 0)
        .then(() => { res = true })
        .catch((e) => { throw new Error(`Error in clearing data -> clearFile: \n ${e}`) })

    return res;
}


const addUser: addUserSignature = async ({fio, email, password, dateOfBirth, role, isActivated}) => {
    const formattedRaw = `${fio}!${email}!${password}!${dateOfBirth}!${role}!${isActivated}\n`;
    let res: boolean = false;
    await fs.appendFile(path, formattedRaw)
        .then(() => { res = true })
        .catch((e) => { throw new Error(`Error in adding data -> addUser: \n ${e}`) })

    return { data: res };
}


const blockUser: blockUserSignature = async (email) => {
    let data = await getUsers();
    data.data = data.data.filter(user => user.email !== email);
    let res: boolean = false;
    clearFile(path);

    for(let i = 0; i < data.data.length; i++) {
        const formattedRaw = `${data.data[i]?.fio}!${data.data[i]?.email}!${data.data[i]?.password}!${data.data[i]?.dateOfBirth}!${data.data[i]?.role}!${data.data[i]?.isActivated}\n`;
        await fs.appendFile(path, formattedRaw)
            .then(() => res = true)
            .catch((e) => { throw new Error(`Error in adding one raw data -> blockUser: \n ${e}`) })
    }

    return { data: res };
}

export { addUser, blockUser }