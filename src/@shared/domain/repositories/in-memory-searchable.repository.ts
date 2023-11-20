import { Entity } from '../entities/entity.entity';
import { NotFoundError } from '../errors/not-found-error';
import { InMemoryRepository } from './in-memory.repository';
import { Repository } from './repository-contracts';
import { SearchableRepository } from './searchable-repository-contracts';

export abstract class InMemorySearchableRepository<
    E extends Entity,
    Query,
    Result,
  >
  extends InMemoryRepository<E>
  implements SearchableRepository<E, Query, Result>
{
  items: E[] = [];

  search(props: Query): Promise<Result> {
    throw new Error('Method not implemented.');
  }
}
