import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { createValidator } from '../validator-factory';

@Directive({
  selector: '[appMinNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinNumberDirective, multi: true}]
})
export class MinNumberDirective implements Validator {
  @Input('appMinNumber') minNumber: number;

  validate(control: AbstractControl): ValidationErrors {
    let regExpPattern = `(?:.*[0-9]){${this.minNumber},}.*`;
    let regExp = new RegExp(regExpPattern);

    return this.minNumber ? createValidator(regExp, "minNumber")(control) : null;
  }

  constructor() { }

}
