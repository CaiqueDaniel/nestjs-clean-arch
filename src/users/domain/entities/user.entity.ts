import { Entity } from '../../../@shared/domain/entities/entity.entity';
import { UserValidatorFactory } from '../validators/user.validator';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps, id?: string) {
    User.validate(props);
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set name(value: string) {
    User.validate({ ...this.props, name: value });
    this.props.name = value;
  }

  set email(value: string) {
    User.validate({ ...this.props, email: value });
    this.props.email = value;
  }

  set password(value: string) {
    User.validate({ ...this.props, password: value });
    this.props.password = value;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    validator.validate(props);
  }
}
