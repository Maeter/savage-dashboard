export const roll = die => {
  const result = Math.floor(Math.random() * Math.floor(die)) + 1;
  return result === die ? result + roll(die) : result;
}

export const traitCheck = (die = 4) => {
  const dx = roll(die);
	const d6 = roll(6);
	const max = Math.max(dx, d6);
	return max;
}
