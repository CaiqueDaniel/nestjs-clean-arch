import { validateSync } from 'class-validator';
import {
  FieldsErrors,
  validatorFieldsInterface,
} from './validator-fields.interface';

export abstract class ClassValidatorFields<PropsValidated>
  implements validatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = {};
  validatedData: PropsValidated = null;

  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }

      return false;
    }

    this.validatedData = data;

    return true;
  }
}
