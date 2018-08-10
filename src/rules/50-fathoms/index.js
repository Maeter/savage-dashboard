import { FIFTY_FATHOMS } from '../constants';
import ruleset from './50fathoms.json';

let prevIndex = 0;
const titles = ruleset.filter(
  (text, index) => { // Titles on 50Fathoms (11)
    const isTitle = text.fontSize === 11
      && isNaN(text.text) // Remove page numbers
      && text.text.indexOf('....') === -1; // Remove index entries
    if(isTitle) {
      ruleset[prevIndex].indexEnd = index;
      ruleset[index].indexStart = index;
      ruleset[index].book = FIFTY_FATHOMS;
      prevIndex = index;
    }
    return isTitle;
});

export default ({
  titles,
  ruleset,
})
