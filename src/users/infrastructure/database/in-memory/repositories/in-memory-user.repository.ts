import { ConflictError } from 'src/@shared/domain/errors/conflict-error';
import { NotFoundError } from 'src/@shared/domain/errors/not-found-error';
import { InMemorySearchableRepository } from 'src/@shared/domain/repositories/in-memory-searchable.repository';
import { SortDirection } from 'src/@shared/domain/repositories/searchable-repository-contracts';
import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<User>
  implements UserRepository.Repository
{
  sortableFields: string[] = ['name', 'createdAt']

  async findByEmail(email: string): Promise<User> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError(`Entity not found using email ${email}`)
    }
    return entity
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError('Email address already used')
    }
  }

  protected async applyFilter(
    items: User[],
    filter: UserRepository.Filter,
  ): Promise<User[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(
    items: User[],
    sort: string | null,
    sortDir: SortDirection | null,
  ): Promise<User[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDir)
  }
}