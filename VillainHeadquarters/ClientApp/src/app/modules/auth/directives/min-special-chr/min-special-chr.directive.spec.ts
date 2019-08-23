import { MinSpecialChrDirective } from './min-special-chr.directive';
import { FormControl } from '@angular/forms';

describe('MinSpecialChrDirective', () => {
  let directive: MinSpecialChrDirective;
  let fakeControl: FormControl;

  beforeEach(() => {
    directive = new MinSpecialChrDirective();
    fakeControl = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate with a return value of null if minSpecialChr is falsy.', () => {
    expect(directive.validate(fakeControl)).toBeNull();
  });

  it('should validate with a return value of null if minSpecialChr is 1 with string "W$a".', () => {
    directive.minSpecialChr = 1;
    fakeControl.setValue("W$a");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minSpecialChr is 1 with string "WSA".', () => {
    directive.minSpecialChr = 1;
    fakeControl.setValue("WSA");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with a return value of null if minSpecialChr is 2 with string "@W$b".', () => {
    directive.minSpecialChr = 2;
    fakeControl.setValue("@W$b");

    let actual = directive.validate(fakeControl);

    expect(actual).toBeNull();
  });

  it('should validate with an object return value if minSpecialChr is 2 with string "W$Ab".', () => {
    directive.minSpecialChr = 2;
    fakeControl.setValue("W$Ab");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });

  it('should validate with an object return value if minSpecialChr is 4 with string "$%@".', () => {
    directive.minSpecialChr = 4;
    fakeControl.setValue("$%@");

    let actual = directive.validate(fakeControl);

    expect(actual).not.toBeNull();
  });
});
