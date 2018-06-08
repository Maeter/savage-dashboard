import * as dice from './dice';

describe('roll fn', () => {
  it('returns expected values', () => {
    function* rollerFnGenerator() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 1; // <- This one is the exploded value of teh last roll
    };
    const rollerFn = rollerFnGenerator();
    const roll = () => rollerFn.next().value;
    expect(dice.roll(4, roll)).toBe(1);
    expect(dice.roll(4, roll)).toBe(2);
    expect(dice.roll(4, roll)).toBe(3);
    // Rolls 4, explodes and then rolls 1
    expect(dice.roll(4, roll)).toBe(5);
  })
});

describe('traitCheck fn', () => {
  it('returns expected values', () => {
    // We assume each roll will come up the highest possible value.
    const newRollFn = x => x;
    // Rolled values below 6 (included), return 6,
    // otherwise the other value
    for(let i = 1; i<13; i++)
      expect(dice.traitCheck(i, newRollFn)).toBe(i < 6 ? 6 : i);
  })
});
