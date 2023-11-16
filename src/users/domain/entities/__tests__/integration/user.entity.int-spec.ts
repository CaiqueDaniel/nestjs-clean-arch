import { EntityValidationError } from 'src/@shared/domain/errors/validation-error';
import { User, UserProps } from '../../user.entity';
import { faker } from '@faker-js/faker';

describe('User integration tests', () => {
  const mockProps = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  describe('Constructor method', () => {
    it('Should throw an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...mockProps,
        name: null,
      };
      
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        name: '',
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        name: 10 as any,
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        name: 'a'.repeat(256),
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...mockProps,
        email: null,
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        email: '',
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        email: 10 as any,
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        email: 'a'.repeat(256),
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);
    });

    it('Should throw an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...mockProps,
        password: null,
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        password: '',
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        password: 10 as any,
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);

      props = {
        ...mockProps,
        password: 'a'.repeat(101),
      };
      expect(() => new User(props)).toThrowError(EntityValidationError);
    });
  });
});
