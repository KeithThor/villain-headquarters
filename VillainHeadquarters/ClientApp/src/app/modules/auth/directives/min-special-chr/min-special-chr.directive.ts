import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { createValidator } from '../validator-factory';

@Directive({
  selector: '[appMinSpecialChr]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinSpecialChrDirective, multi: true}]
})
export class MinSpecialChrDirective {
  @Input('appMinSpecialChr') minSpecialChr: number;

  validate(control: AbstractControl): ValidationErrors {
    let regExpPattern = `(?:.*[!@#$%^&*]){${this.minSpecialChr},}.*`;
    let regExp = new RegExp(regExpPattern);

    return this.minSpecialChr ? createValidator(regExp, "minSpecialChr")(control) : null;
  }

  constructor() { }

}
