import React from 'react';
import DiceSelect from './dice-select';

const cssAttribute = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const Attribute = ({ name }) => (
  <div className='attribute' style={cssAttribute}>
    <label>{name}:</label>
    <DiceSelect trait={name}/>
  </div>
);

export default Attribute;
