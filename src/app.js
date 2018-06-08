import React, { Component, Fragment } from 'react';
import SheetManager from './modules/sheet-manager';
import PerceptionCheck from './modules/perception-check';

class App extends Component {
  render() {
    return (
      <Fragment>
        <PerceptionCheck />
        <SheetManager />
      </Fragment>
    );
  }
}

export default App;
