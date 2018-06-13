import React, { Component } from 'react';
import styled from 'styled-components';
import SingleDiceRoll from '../components/single-dice-roll';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const WildCardCheckbox = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 1rem;
  > input{
    margin-right: 0.5rem;
  }
`;

class TraitRoller extends Component {
  constructor() {
    super();
    this.state = { isWildCard: false };
  }

  toggleWildCard = () => this.setState({ isWildCard: !this.state.isWildCard });

  render() {
    const { isWildCard } = this.state;
    return (
      <div className={'dice-roller'}>
        <h3>Trait roller</h3>
        <WildCardCheckbox>
          <input type="checkbox" onClick={this.toggleWildCard}/>
          Wild Card
        </WildCardCheckbox>
        <Wrapper>
          {[4, 6, 8, 10, 12].map(dice => (
            <SingleDiceRoll
              dice={dice}
              isWildCard={isWildCard}
              key={dice}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default TraitRoller;
