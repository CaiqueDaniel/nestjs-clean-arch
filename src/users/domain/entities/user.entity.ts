import { Entity } from '../../../@shared/domain/entities/entity.entity';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password(){
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set email(value: string) {
    this.props.email = value;
  }

  set password(value: string) {
    this.props.password = value;
  }
}
