import { User } from '../entities/user.entity';
import { SearchableRepositoryInterface } from 'src/@shared/domain/repositories/searchable-repository-contracts';

export interface UserRepository extends SearchableRepositoryInterface<User, any, any> {
  findByEmail(email: string): Promise<User>;
  emailExists(email: string): Promise<void>;
}
