import React, { Component, Fragment } from 'react';
import Module from './components/module-wrapper';
import RuleSearch from './modules/rule-search';
import PerceptionCheck from './modules/perception-check';
import TraitRoller from './modules/trait-roller';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Module><TraitRoller /></Module>
        <Module><PerceptionCheck /></Module>
        <Module><RuleSearch /></Module>
      </Fragment>
    );
  }
}

export default App;
