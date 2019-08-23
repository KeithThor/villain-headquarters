import { MinLowerCaseDirective } from './min-lower-case.directive';
import { FormControl } from '@angular/forms';

describe('MinLowerCaseDirective', () => {
  let directive: MinLowerCaseDirective;
  let fakeControl: FormControl;

  beforeEach(() => {
    directive = new MinLowerCaseDirective();
    fakeControl = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate with a return value of null if minLowerCase is falsy.', () => {
    expect(directive.validate(fakeControl)).toBeNull();
  });

  it('should validate with a return value of null if minLowerCase is 1 with string "WSa".', () => {
    directive.minLowerCase = 1;
    fakeControl.setValue("WSa");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minLowerCase is 1 with string "WSA".', () => {
    directive.minLowerCase = 1;
    fakeControl.setValue("WSA");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with a return value of null if minLowerCase is 1 with string "aWSb".', () => {
    directive.minLowerCase = 2;
    fakeControl.setValue("aWSb");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minLowerCase is 2 with string "WSAb".', () => {
    directive.minLowerCase = 2;
    fakeControl.setValue("WSAb");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with an object return value if minLowerCase is 4 with string "asd".', () => {
    directive.minLowerCase = 4;
    fakeControl.setValue("asd");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });
});
