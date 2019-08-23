import { ValidatorFn, AbstractControl } from "@angular/forms";

/**Returns a new function that validates a control element on a form with the provided regular expression.
 * If the validation fails, an error object is returned with the name of the provided string.
 */
export function createValidator(matcher: RegExp, nameOfObj: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const foundMatch = matcher.test(control.value);
        return foundMatch ? null : {nameOfObj: {value: control.value}};
    };
}