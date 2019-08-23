import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { createValidator } from '../validator-factory';

@Directive({
  selector: '[appMinUpperCase]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinUpperCaseDirective, multi: true}]
})
export class MinUpperCaseDirective implements Validator {
  @Input('appMinUpperCase') minUpperCase: number;

  validate(control: AbstractControl): ValidationErrors {
    let regExpPattern = `(?:.*[A-Z]){${this.minUpperCase},}.*`;
    let regExp = new RegExp(regExpPattern);

    return this.minUpperCase ? createValidator(regExp, "minUpperCase")(control) : null;
  }

  constructor() { }

}
