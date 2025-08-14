import { fullCheckDateOfBirth, fullCheckEmail, fullCheckFIO, fullCheckPassword, fullCheckRole } from './validate.js';

describe("Валидация данных", () => {
  describe("FullCheckDateOfBirth", () => {
    const validStringDotDate = '24.07.2009';
    const validStringIsoDate = '2009-07-24';
    const validDate = new Date(2009, 7, 24);

    const validStringDotDateNextToEnd = '24.07.1941';   // Пограничные }
    const validStringIsoDateNextToEnd = '1941-07-24';   //             }
    const validDateNextToEnd = new Date(1941, 7, 24);   // значения    }

    const notValidStringDotDate = '24.07.3455';
    const notValidStringIsoDate = '3455-07-24';
    const notValidDate = new Date(3455, 7, 24);

    it("Корректное значение", () => {
      expect(fullCheckDateOfBirth(validStringDotDate)).toBe(true);
      expect(fullCheckDateOfBirth(validStringIsoDate)).toBe(true);
      expect(fullCheckDateOfBirth(validDate)).toBe(true);
    });

    it("Корректное пограничное значение", () => {
      expect(fullCheckDateOfBirth(validStringDotDateNextToEnd)).toBe(true);
      expect(fullCheckDateOfBirth(validStringIsoDateNextToEnd)).toBe(true);
      expect(fullCheckDateOfBirth(validDateNextToEnd)).toBe(true);
    });

    it("Некорректное значение", () => {
      expect(fullCheckDateOfBirth(notValidStringDotDate)).toBe(false);
      expect(fullCheckDateOfBirth(notValidStringIsoDate)).toBe(false);
      expect(fullCheckDateOfBirth(notValidDate)).toBe(false);
    });
  });

  describe("fullCheckEmail", () => {
    const validEmail = 'ibragim.rabadanov.09@mail.ru';
    const NotValidEmail1 = 'fsidojfiodsfj';
    const NotValidEmail2 = 'ibragim@fgfdg@fgfdg.com.ru';
    const NotValidEmail3 = ' ';

    it('Коррекное значение', () => {
      expect(fullCheckEmail(validEmail)).toBe(true);
    });

    it('Некоррекное значение', () => {
      expect(fullCheckEmail(NotValidEmail1)).toBe(false);
      expect(fullCheckEmail(NotValidEmail2)).toBe(false);
      expect(fullCheckEmail(NotValidEmail3)).toBe(false);
    });
  });

  describe("fullCheckFIO", () => {
    const validFIO = 'Воронин Николай Петрович';
    const NotValidFIO1 = 'fsidojfiodsfj';
    const NotValidFIO2 = 'я  Воронин Николай Петрович';
    const NotValidFIO3 = ' ';

    it('Коррекное значение', () => {
      expect(fullCheckFIO(validFIO)).toBe(true);
    });

    it('Некоррекное значение', () => {
      expect(fullCheckFIO(NotValidFIO1)).toBe(false);
      expect(fullCheckFIO(NotValidFIO2)).toBe(false);
      expect(fullCheckFIO(NotValidFIO3)).toBe(false);
    });
  });

  describe("fullCheckPassword", () => {
    const validPassword = 'tasdfsdk415645';
    const NotValidPassword1 = 'fs48';
    const NotValidPassword2 = 'пароль4565';
    const NotValidPassword3 = ' ';

    it('Коррекное значение', () => {
      expect(fullCheckPassword(validPassword)).toBe(true);
    });

    it('Некоррекное значение', () => {
      expect(fullCheckPassword(NotValidPassword1)).toBe(false);
      expect(fullCheckPassword(NotValidPassword2)).toBe(false);
      expect(fullCheckPassword(NotValidPassword3)).toBe(false);
    });
  });

  describe("fullCheckRole", () => {
    const validRole1 = 'USER';
    const validRole2 = 'ADMIN';
    const NotValidRole1 = 'Admin';
    const NotValidRole2 = 'User';
    const NotValidRole3 = ' ';

    it('Коррекное значение', () => {
      expect(fullCheckRole(validRole1)).toBe(true);
      expect(fullCheckRole(validRole2)).toBe(true);
    });

    it('Некоррекное значение', () => {
      expect(fullCheckRole(NotValidRole1)).toBe(false);
      expect(fullCheckRole(NotValidRole2)).toBe(false);
      expect(fullCheckRole(NotValidRole3)).toBe(false);
    });
  });
});