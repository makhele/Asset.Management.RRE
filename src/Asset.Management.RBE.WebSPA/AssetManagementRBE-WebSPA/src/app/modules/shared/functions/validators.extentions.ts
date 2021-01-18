import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {SaIdNumberVerification} from './sa-id-number-verification';

export class ExtendedValidators {
  static decimal(control: AbstractControl): ValidationErrors|null {
    if (control.value === '') {
      return null;
      // don't validate empty values to allow optional controls
    }
    if (control.value && !control.value.toString().match(/^\d+(\.\d{1,2})?$/)) {
      return { decimal: true };
    }
    return null;
  }
  static wholeNumber(control: AbstractControl): ValidationErrors|null {
    if (control.value === '') {
      return null;
      // don't validate empty values to allow optional controls
    }
    if (control.value && !control.value.toString().match(/^[1-9]\d*$/)) {
      return { wholeNumber: true };
    }
    return null;
  }
  static noSpaces(control: AbstractControl): ValidationErrors|null {
    if (control.value === '') {
      return null;
      // don't validate empty values to allow optional controls
    }
    if (control.value && !control.value.toString().match(/^[a-zA-Z0-9]*$/)) {
      return { noSpaces: true };
    }
    return null;
  }

  static SAIDVerification(control: AbstractControl): ValidationErrors|null {
    if (control.value === '') {
      return null;
      // don't validate empty values to allow optional controls
    }
    if (!SaIdNumberVerification.SAIDCheck(control.value.toString())) {
      return { SAIDVerification: true };
    }
    return null;
  }
}
