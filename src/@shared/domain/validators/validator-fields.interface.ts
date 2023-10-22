export type FieldsErrors = Record<string, string[]>;

export interface validatorFieldsInterface<P> {
  errors: FieldsErrors;
  validatedData: P;
  validate(data: any): boolean;
}
