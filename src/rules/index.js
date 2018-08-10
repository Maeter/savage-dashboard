import coreRulebook from './core';
import FiftyFathomsRulebook from './50-fathoms';
import { CORE_RULEBOOK, FIFTY_FATHOMS } from './constants';

export default {
  [CORE_RULEBOOK]: {
    texts: coreRulebook.ruleset,
    titles: coreRulebook.titles,
  },
  [FIFTY_FATHOMS]: {
    texts: FiftyFathomsRulebook.ruleset,
    titles: FiftyFathomsRulebook.titles,
  }
}
