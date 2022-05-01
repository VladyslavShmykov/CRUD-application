import {AbstractControl, ValidationErrors} from "@angular/forms";

export function stateNumberValidator(control: AbstractControl): ValidationErrors | null {
  const firstPartValid: boolean = /^[А-Яа-я]+$/.test(control.value.substring(0, 2) + control.value.substring(6, 8));
  const secondPartValid: boolean = /^[0-9]+$/.test(control.value.substring(2, 6));
  if (!firstPartValid || !secondPartValid) {
    return {invalid: true}
  }

  return null;
}
