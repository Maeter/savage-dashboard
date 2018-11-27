import { CORE_RULEBOOK } from '../constants';
import rulesetJson from './core.json';

const rulesetTitles = rulesetJson.slice(0);

// Titles & Texts
let prevTitleIndex = 0;
const titles = rulesetTitles.filter(
  (text, index) => { // titles on Deluxe (15)
    const isTitle = [12, 14, 15].includes(text.fontSize)
      && isNaN(text.text) // Remove page numbers
      && text.text.indexOf('....') === -1; // Remove index entries
    if(isTitle) {
      rulesetTitles[prevTitleIndex].indexEnd = index;
      rulesetTitles[index].indexStart = index;
      rulesetTitles[index].book = CORE_RULEBOOK;
      prevTitleIndex = index;
    }
    return isTitle;
});

// Tables and Modifiers
// const rulesetTables = rulesetJson.slice(0);
// const firstTableIndex = rulesetTables.findIndex(item => item.text === 'Collected Charts & T');
// const lastTableIndex = rulesetTables.findIndex(item => item.text === '187');
//
// let prevTableIndex = firstTableIndex;
// let tables = [];
// const tablesSection = rulesetTables.slice(firstTableIndex, lastTableIndex);
//
// tablesSection.forEach((text, index) => {
//
//   if(text.fontSize === 16) {
//     rulesetTables[prevTableIndex].indexEnd = index;
//     rulesetTables[index].indexStart = index;
//     prevTitleIndex = index;
//     tables.push({
//       text: rulesetTables[index].text
//     });
//   }
// });

export default ({
  titles,
  // tables,
  ruleset: rulesetJson.slice(0),
});
