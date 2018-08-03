import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 1rem;
`;

export default ({ trait, id, onChange, value }) => (
  <Wrapper className={'dice-select'}>
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
  </Wrapper>
);
