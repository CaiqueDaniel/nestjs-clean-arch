import { Repository } from 'src/@shared/domain/repositories/repository-contracts';
import { User } from '../entities/user.entity';

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User>;
  emailExists(email: string): Promise<void>;
}
