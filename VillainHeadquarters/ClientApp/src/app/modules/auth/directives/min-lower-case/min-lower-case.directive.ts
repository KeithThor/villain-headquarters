import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { createValidator } from '../validator-factory';

/**Directive added to a form input to check that an input has a specified minimum characters
 * that are lower case.
 */
@Directive({
  selector: '[appMinLowerCase]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinLowerCaseDirective, multi: true}]
})
export class MinLowerCaseDirective implements Validator {
  @Input('appMinLowerCase') minLowerCase: number;

  validate(control: AbstractControl): ValidationErrors {
    let regExpPattern = `(?:.*[a-z]){${this.minLowerCase},}.*`;
    let regExp = new RegExp(regExpPattern);

    return this.minLowerCase ? createValidator(regExp, "minLowerCase")(control) : null;
  }

  constructor() { }

}
