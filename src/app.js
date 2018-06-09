import React, { Component, Fragment } from 'react';
import RuleSearch from './modules/rule-search';
import PerceptionCheck from './modules/perception-check';

class App extends Component {
  render() {
    return (
      <Fragment>
        <PerceptionCheck />
        <RuleSearch />
      </Fragment>
    );
  }
}

export default App;
