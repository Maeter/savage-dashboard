import React, { Component } from 'react';
import Attribute from '../components/attribute';

class SheetManager extends Component {
  render() {
    return (
      <div>
        <h3>character generator</h3>
        <p>@TODO: Add MobX for state management</p>
        <Attribute name={'AGI'} />
        <Attribute name={'STR'} />
        <Attribute name={'SMA'} />
        <Attribute name={'SPI'} />
        <Attribute name={'VIG'} />
      </div>
    );
  }
}

export default SheetManager;
