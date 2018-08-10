import { CORE_RULEBOOK } from '../constants';
import ruleset from './core.json';

let prevIndex = 0;
const titles = ruleset.filter(
  (text, index) => { // titles on Deluxe (15)
    const isTitle = text.fontSize === 15
      && isNaN(text.text) // Remove page numbers
      && text.text.indexOf('....') === -1; // Remove index entries
    if(isTitle) {
      ruleset[prevIndex].indexEnd = index;
      ruleset[index].indexStart = index;
      ruleset[index].book = CORE_RULEBOOK;
      prevIndex = index;
    }
    return isTitle;
});

export default ({
  titles,
  ruleset,
})
