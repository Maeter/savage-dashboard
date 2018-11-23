import coreRulebook from './core';
import fiftyFathomsRulebook from './50-fathoms';
import { CORE_RULEBOOK, FIFTY_FATHOMS } from './constants';

export default {
  [CORE_RULEBOOK]: coreRulebook,
  [FIFTY_FATHOMS]: fiftyFathomsRulebook,
}
