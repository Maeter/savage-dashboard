
export const naturalRoll = die =>
  Math.floor(Math.random() * die) + 1;

export const roll = (die, rollingFn = naturalRoll) => {
  const rolledVal = rollingFn(die);
  return rolledVal === die ? rolledVal + roll(die, rollingFn) : rolledVal;
};

export const traitCheck = (die = 4, rollingFn = roll) => {
  const dx = rollingFn(die);
	const d6 = rollingFn(6);
	const max = Math.max(dx, d6);
	return max;
};
