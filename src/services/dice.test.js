import {
  roll,
  naturalRoll,
  traitCheck,
} from './dice';

describe('naturalRoll fn', () => {

  const originalMath = Object.create(global.Math);
  const mockMath = Object.create(global.Math);

  beforeEach(() => global.Math = mockMath);
  afterEach(() => global.Math = originalMath);

  it('returns expected values', () => {
    [4, 6, 8, 10, 12, 20, 100].map((dice) => {
      mockMath.random = () => 0.99; // 1 is not included
      expect(naturalRoll(dice)).toBe(dice);
      mockMath.random = () => 0.50;
      expect(naturalRoll(dice)).toBe((dice/2)+1);
      mockMath.random = () => 0.00;
      expect(naturalRoll(dice)).toBe(1);
    });
  });
});

describe('roll fn', () => {
  it('returns expected values', () => {
    function* rollerFnGenerator() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      // This next one is the exploded
      // value of from last roll
      yield 1;
    };
    const generatedRollFn = rollerFnGenerator();
    const rollFn = () => generatedRollFn.next().value;
    const expectFn = (expectation) => expect(roll(4, rollFn)).toBe(expectation);
    [1, 2, 3].forEach(expectFn);
    // Rolls 4, explodes and then rolls 1
    expectFn(5);
  })
});

describe('traitCheck fn', () => {
  it('returns expected values', () => {
    // We assume each roll will come up the highest possible value.
    const newRollFn = x => x;
    // Rolled values below 6 (included), return 6,
    // otherwise the other value
    [2, 4, 6, 8, 10, 12, 20, 100].map((dieType) => {
      expect(traitCheck(dieType, true, newRollFn))
        .toEqual({
          trait: dieType,
          wild: 6,
          result: dieType < 6 ? 6 : dieType,
        });
    });
  });
});
