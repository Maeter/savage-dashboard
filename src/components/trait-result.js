import React from 'react';
import styled from 'styled-components';

const size = '3rem';

const TraitDieResult = styled.span`
  color: red;
  font-size: 0.9rem;
  height: 1.2rem;
  width: 1.2rem;
  border: 1px red solid;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  ::after { content: '!'};
  z-index: 0;
`;

const RollResult = styled.div`
  ${p => p.children === 1 && `color: red;`}
  z-index: 1;
`;

const ResultWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
  width: ${size};
  height: ${size};
`;


const TraitResult = ({ roll, isWildCard }) => (
  <ResultWrapper className="trait-result">
    <RollResult>{roll.result}</RollResult>
    {
      isWildCard && roll.trait === 1 && <TraitDieResult>{roll.trait}</TraitDieResult>
    }
  </ResultWrapper>
);

export default TraitResult;
