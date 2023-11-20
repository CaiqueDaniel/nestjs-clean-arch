import { ConflictError } from 'src/@shared/domain/errors/conflict-error';
import { NotFoundError } from 'src/@shared/domain/errors/not-found-error';
import { InMemoryRepository } from 'src/@shared/domain/repositories/in-memory.repository';
import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export class InMemoryUserRepository
  extends InMemoryRepository<User>
  implements UserRepository
{
  async findByEmail(email: string): Promise<User> {
    const entity = this.items.find((item) => item.email == email);

    if (!entity)
      throw new NotFoundError(`Entity not found using email ${email}`);

    return entity;
  }

  async emailExists(email: string): Promise<void> {
    if (this.items.find((item) => item.email == email))
      throw new ConflictError('Email address already used');
  }
}
