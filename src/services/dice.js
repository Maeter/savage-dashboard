
export const naturalRoll = die =>
  Math.floor(Math.random() * die) + 1;

export const roll = (die, rollingFn = naturalRoll) => {
  const rolledVal = rollingFn(die);
  return rolledVal === die ? rolledVal + roll(die, rollingFn) : rolledVal;
};

export const traitCheck = (die = 4, isWildCard = true, rollingFn = roll, ) => {
  const dx = rollingFn(die);
	return isWildCard ? Math.max(dx, rollingFn(6)) : dx;
};
