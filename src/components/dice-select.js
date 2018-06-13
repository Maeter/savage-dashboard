import React from 'react';

export default ({ trait, id, onChange, value }) => (
  <div className={'dice-select'}>
    {
      [4, 6, 8, 10, 12].map((dice, i) => (
        <label key={`${trait}-${dice}`}>
          {dice}:
          <input
            type="radio"
            name={`${trait}-${id}`}
            onChange={onChange}
            value={dice}
            checked={+value === dice}
          />
        </label>
      ))
    }
  </div>
);
