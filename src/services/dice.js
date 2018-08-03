

export const naturalRoll = die =>
  Math.floor(Math.random() * die) + 1;

export const roll = (die, rollingFn = naturalRoll) => {
  const rolledVal = rollingFn(die);
  return rolledVal === die ? rolledVal + roll(die, rollingFn) : rolledVal;
};

export const traitCheck = (die = 4, isWildCard = true, rollingFn = roll, ) => {
  const dx = rollingFn(die);
  const d6 = rollingFn(6);
  return ({
    trait: dx,
    wild: isWildCard ? d6 : null,
    result: isWildCard ? Math.max(dx, d6) : dx,
  });
};
