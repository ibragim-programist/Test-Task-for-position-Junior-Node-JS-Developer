import type { TUser } from "../types/UserType.js";
import fs from 'fs/promises';
import { Roles } from "../types/UserType.js";

// Если вдруг не понимаете где работа с субд, то прочитайте README.md файл 

const path = `../data/Users.txt`;

interface checkExistUserSignature {
    (email: string, password: string): Promise<{ data: boolean }>;
}

interface getUserByEmailSignature {
    (email: string): Promise<{ data: boolean }>;
}

interface getUsersSignature {
    (): Promise<{data: TUser[]}>;
}


const checkExistUser: checkExistUserSignature = async (email, password) => {
    try {
        const fileContent = await fs.readFile(path, 'utf-8');
        const users = fileContent.split('\n').filter(line => line.trim() !== '');
        
        const userExists = users.some(userLine => {
            const [fio, userEmail, userPassword, ...othersData] = userLine.split('!');
            return userEmail === email && userPassword === password;
        });

        return {
            data: userExists
        };
    } catch (e) {
        throw new Error(`Error in checkExistUser: ${e instanceof Error ? e.message : String(e)}`);
    }
}


const getUserByEmail: getUserByEmailSignature = async (email) => {
    try {
        const fileContent = await fs.readFile(path, 'utf-8');
        const users = fileContent.split('\n').filter(line => line.trim() !== '');
        
        const userExists = users.some(userLine => {
            const [fio, userEmail, ...othersData] = userLine.split('!');
            return userEmail === email;
        });

        return {
            data: userExists
        };
    } catch (e) {
        throw new Error(`Error in checkExistUser: ${e instanceof Error ? e.message : String(e)}`);
    }
}


const getUsers: getUsersSignature = async () => {
    try {
        const fileContent = await fs.readFile(path, 'utf-8');
        const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');

        const data: TUser[] = [];

        for (const line of lines) {
            const parts = line.split('!');
            if (parts.length !== 6) {
                throw new Error(`Skipping invalid line (expected 6 parts, got ${parts.length}): ${line}`);
            }

            const [fio, email, password, dateOfBirth, role, isActivatedStr] = parts;

            if(fio && email && password && dateOfBirth && role && isActivatedStr) {
                data.push({
                    fio: fio,
                    email: email,
                    password: password,
                    dateOfBirth: dateOfBirth,
                    role: (role === Roles.ADMIN) ? Roles.ADMIN : Roles.USER,
                    isActivated: isActivatedStr === 'true',
                });
            }

            
        }

        return { data: data };
    } catch (e) {
        throw new Error(`Error in getUsers: ${e instanceof Error ? e.message : String(e)}`);
    }
};

export { checkExistUser, getUserByEmail, getUsers };