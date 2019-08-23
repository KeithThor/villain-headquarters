import { MinNumberDirective } from './min-number.directive';
import { FormControl } from '@angular/forms';

describe('MinNumberDirective', () => {
  let directive: MinNumberDirective;
  let fakeControl: FormControl;

  beforeEach(() => {
    directive = new MinNumberDirective();
    fakeControl = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate with a return value of null if minNumber is falsy.', () => {
    expect(directive.validate(fakeControl)).toBeNull();
  });

  it('should validate with a return value of null if minNumber is 1 with string "W2a".', () => {
    directive.minNumber = 1;
    fakeControl.setValue("W2a");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minNumber is 1 with string "WSA".', () => {
    directive.minNumber = 1;
    fakeControl.setValue("WSA");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with a return value of null if minNumber is 2 with string "2W1b".', () => {
    directive.minNumber = 2;
    fakeControl.setValue("2W1b");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minNumber is 2 with string "W5Ab".', () => {
    directive.minNumber = 2;
    fakeControl.setValue("W5Ab");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with an object return value if minNumber is 4 with string "769".', () => {
    directive.minNumber = 4;
    fakeControl.setValue("769");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });
});
