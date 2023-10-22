export interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export class User {
  constructor(private readonly props: UserProps) {
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
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
