import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(aKey: string, bKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const a = group.get(aKey)?.value;
    const b = group.get(bKey)?.value;
    return a === b ? null : { mismatch: true };
  };
}
