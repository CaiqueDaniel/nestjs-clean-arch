import { User, UserProps } from '../../user.entity';
import { faker } from '@faker-js/faker';

describe('User entity unit tests', () => {
  let props: UserProps, sut: User;

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    sut = new User(props);
  });

  test('Constructor method', () => {
    expect(sut.name).toBe(props.name);
    expect(sut.email).toBe(props.email);
    expect(sut.password).toBe(props.password);
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });
});
