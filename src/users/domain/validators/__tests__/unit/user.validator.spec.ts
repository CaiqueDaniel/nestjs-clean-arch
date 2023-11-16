import { faker } from '@faker-js/faker';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';

let sut: UserValidator;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  test('valid cases', () => {
    const props = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    };

    const isValid = sut.validate(props);

    expect(isValid).toBeTruthy();
    expect(sut.validatedData).toStrictEqual(new UserRules(props));
    expect(sut.errors).toBe(null);
  });

  describe('name field', () => {
    test('invalidation cases for name field', () => {
      let isValid = sut.validate(null as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: '',
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

      isValid = sut.validate({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: 10 as any,
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: 'a'.repeat(256),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['name']).toStrictEqual([
        'name must be shorter than or equal to 255 characters',
      ]);
    });
  });

  describe('email field', () => {
    test('invalidation cases for email field', () => {
      let isValid = sut.validate(null as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be a string',
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        email: '',
        password: faker.internet.password(),
        name: faker.person.fullName(),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email should not be empty',
        'email must be an email',
      ]);

      isValid = sut.validate({
        email: 10 as any,
        password: faker.internet.password(),
        name: faker.person.fullName(),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email must be a string',
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ]);

      isValid = sut.validate({
        email: 'a'.repeat(256),
        password: faker.internet.password(),
        name: faker.person.fullName(),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['email']).toStrictEqual([
        'email must be an email',
        'email must be shorter than or equal to 255 characters',
      ]);
    });
  });

  describe('password field', () => {
    test('invalidation cases for password field', () => {
      let isValid = sut.validate(null as any);

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ]);

      isValid = sut.validate({
        email: faker.internet.email(),
        password: '',
        name: faker.person.fullName(),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([
        'password should not be empty',
      ]);

      isValid = sut.validate({
        email: faker.internet.email(),
        password: 10 as any,
        name: faker.person.fullName(),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([
        'password must be a string',
        'password must be shorter than or equal to 100 characters',
      ]);

      isValid = sut.validate({
        email: faker.internet.email(),
        password: 'a'.repeat(256),
        name: faker.person.fullName(),
      });

      expect(isValid).toBeFalsy();
      expect(sut.errors['password']).toStrictEqual([
        'password must be shorter than or equal to 100 characters',
      ]);
    });
  });
});
