import React from 'react';
export default ({ trait }) => (
  <label>
    {
      [4, 6, 8, 10, 12].map((dice, i) => (
        <input type="radio" name={trait} key={`${trait}-${dice}`}/>
      ))
    }
  </label>
);
