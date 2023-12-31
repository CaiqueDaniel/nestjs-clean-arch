import { FieldsErrors } from '../validators/validator-fields.interface';

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public errors: FieldsErrors) {
    super('EntityValidationError');
    this.name = 'EntityValidationError';
  }
}
