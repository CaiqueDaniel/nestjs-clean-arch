import { User } from '../entities/user.entity';
import { SearchableRepository } from 'src/@shared/domain/repositories/searchable-repository-contracts';

export interface UserRepository extends SearchableRepository<User, any, any> {
  findByEmail(email: string): Promise<User>;
  emailExists(email: string): Promise<void>;
}
