import { FieldsErrors } from '../validators/validator-fields.interface';

export class NotFoundError extends Error {
  constructor(message:string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
