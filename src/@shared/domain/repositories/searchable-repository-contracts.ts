import { Entity } from '../entities/entity.entity';
import { Repository } from './repository-contracts';

export interface SearchableRepository<E extends Entity, Query, Result>
  extends Repository<E> {
  search(props: Query): Promise<Result>;
}
