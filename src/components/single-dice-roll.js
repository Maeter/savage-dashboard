import React, { Component } from 'react';
import styled from 'styled-components';
import { traitCheck } from '../services/dice';
import TraitResult from '../components/trait-result';
import Button from '../components/button';

const Wrapper = styled.div`
  margin: 0 0.5rem 0 0;
  text-align: center;
`;

class SingleDiceRoll extends Component {
  constructor() {
    super();
    this.state = { roll: null };
  }
  updateRoll = () => this.setState({
    roll: traitCheck(this.props.dice, this.props.isWildCard),
  });
  render() {
    const { dice, isWildCard } = this.props;
    const { roll } = this.state;
    return (
      <Wrapper className={'single-dice-roll'}>
        <Button onClick={this.updateRoll}>D{dice}</Button>
        {roll && <TraitResult roll={roll} isWildCard={isWildCard}/>}
      </Wrapper>
    );
  }
}

export default SingleDiceRoll;
