import { Entity } from '../entities/entity.entity';
import { NotFoundError } from '../errors/not-found-error';
import { Repository } from './repository-contracts';

export abstract class InMemoryRepository<E extends Entity>
  implements Repository<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string): Promise<E> {
    const entity = this.items.find((item) => item.id == id);

    if (!entity) throw new NotFoundError('Entity not found');

    return entity;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    this.findById(entity.id);

    const entityIndex = this.items.findIndex((item) => item.id == entity.id);
    this.items[entityIndex] = entity;
  }
  async delete(id: string): Promise<void> {
    this.findById(id);

    const entityIndex = this.items.findIndex((item) => item.id == id);
    this.items.splice(entityIndex, 1);
  }
}
