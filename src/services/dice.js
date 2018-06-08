
export const naturalRoll = die =>
  Math.floor(Math.random() * Math.floor(die)) + 1;

export const roll = (die, rollingFn = exports.naturalRoll) => {
  const rolledVal = rollingFn(die);
  return rolledVal === die ? rolledVal + roll(die, rollingFn) : rolledVal;
};

export const traitCheck = (die = 4) => {
  const dx = exports.roll(die);
	const d6 = exports.roll(6);
	const max = Math.max(dx, d6);
	return max;
};
