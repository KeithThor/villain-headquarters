import { MinUpperCaseDirective } from "./min-upper-case.directive"
import { FormControl } from '@angular/forms';

describe('MinUpperCaseDirective', () => {
  let directive: MinUpperCaseDirective;
  let fakeControl: FormControl;

  beforeEach(() => {
    directive = new MinUpperCaseDirective();
    fakeControl = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate with a return value of null if minUpperCase is falsy.', () => {
    expect(directive.validate(fakeControl)).toBeNull();
  });

  it('should validate with a return value of null if minUpperCase is 1 with string "wsA".', () => {
    directive.minUpperCase = 1;
    fakeControl.setValue("wsA");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minUpperCase is 1 with string "wsa".', () => {
    directive.minUpperCase = 1;
    fakeControl.setValue("wsa");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with a return value of null if minUpperCase is 2 with string "AwsB".', () => {
    directive.minUpperCase = 2;
    fakeControl.setValue("AwsB");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minUpperCase is 2 with string "wsab".', () => {
    directive.minUpperCase = 2;
    fakeControl.setValue("wsab");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with an object return value if minUpperCase is 4 with string "ASD".', () => {
    directive.minUpperCase = 4;
    fakeControl.setValue("ASD");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });
});
