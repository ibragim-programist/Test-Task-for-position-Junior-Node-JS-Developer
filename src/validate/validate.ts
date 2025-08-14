import validator from 'validator';
import { Roles } from '../types/UserType.js';

function fullCheckEmail(e: string): boolean {
    return validator.isEmail(e);
}

function fullCheckFIO(fio: string): boolean {
    const parts = fio.split(' ').filter(part => part.trim() !== '');
    
    if (parts.length !== 3) {
        return false;
    }

    for (const part of parts) {
        if (part.length < 2) {
            return false;
        }
    }

    return true;
}

function fullCheckPassword(p: string): boolean {
    const hasLatin = /[a-zA-Z]/.test(p);
    const hasDigit = /\d/.test(p);
    const noCyrillic = !/[а-яА-ЯёЁ]/.test(p);
    
    return p.length >= 6 && hasLatin && hasDigit && noCyrillic;
}

function helpCheckFunc(date: Date): boolean {
    // Проверка, что дата валидна
    if (isNaN(date.getTime())) {
        return false;
    }

    const now = new Date();
    const birthTime = date.getTime();
    const nowTime = now.getTime();

    // Проверка: дата не в будущем
    if (birthTime > nowTime) {
        return false;
    }

    // Проверка: не слишком давно (не ранее 1940 года)
    const minDate = new Date(1940, 0, 1);
    if (birthTime < minDate.getTime()) {
        return false;
    }

    // Проверка: возраст не больше 110 лет
    const maxAgeMs = 110 * 365.25 * 24 * 60 * 60 * 1000;
    if (nowTime - birthTime > maxAgeMs) {
        return false;
    }

    return true;
}

function fullCheckDateOfBirth(d: string | Date): boolean {
    let date: Date;

    if (d instanceof Date) {
        date = d;
        return helpCheckFunc(date);
    } else if (typeof d === 'string') {
        //  Поддержка разных типов: YYYY-MM-DD, DD.MM.YYYY
        const isoMatch = d.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        const dotMatch = d.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

        if (isoMatch) {
            const [, yearStr, monthStr, dayStr] = isoMatch;
            const year = Number(yearStr);
            const month = Number(monthStr);
            const day = Number(dayStr);

        if (isNaN(year) || isNaN(month) || isNaN(day) || year === 0 || month === 0 || day === 0) {
            return false;
        }

            date = new Date(year, month - 1, day);
            return helpCheckFunc(date);
        } else if (dotMatch) {
            const [, dayStr, monthStr, yearStr] = dotMatch;
            const day = Number(dayStr);
            const month = Number(monthStr);
            const year = Number(yearStr);

            if (isNaN(year) || isNaN(month) || isNaN(day) || year === 0 || month === 0 || day === 0) {
                return false;
            }

            date = new Date(year, month - 1, day);
            return helpCheckFunc(date);
        } else {
            return false; // неверный формат
        }
    } else {
        return false; // неверный тип
    }
}


function fullCheckRole(r: string): boolean {
    const trimmed = r.trim();
    if(!trimmed) return false;
    
    return trimmed === Roles.ADMIN || trimmed === Roles.USER;
}


export { fullCheckDateOfBirth, fullCheckEmail, fullCheckFIO, fullCheckPassword, fullCheckRole };