import React, { Component } from 'react';
import styled from 'styled-components';
import { traitCheck } from '../services/dice';

const Wrapper = styled.div`
  margin: 0 0.5rem 0 0;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 10%;
`;

const Result = styled.span`
  display: block;
  margin-top: 1rem;
  font-size: 2rem;
`;

class SingleDiceRoll extends Component {
  constructor() {
    super();
    this.state = { roll: null };
  }
  roll = () => this.setState({
    roll: traitCheck(this.props.dice, this.props.isWildCard),
  });
  render() {
    const { dice } = this.props;
    const { roll } = this.state;
    return (
      <Wrapper className={'single-dice-roll'}>
        <Button onClick={this.roll}>D{dice}</Button>
        {roll && <Result>{roll}</Result>}
      </Wrapper>
    );
  }
}

export default SingleDiceRoll;
