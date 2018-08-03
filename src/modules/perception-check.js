import React, { Component, Fragment } from 'react';

import { traitCheck } from '../services/dice';
import Button from '../components/button';
import DiceSelect from '../components/dice-select';
import Input from '../components/input';
import TraitResult from '../components/trait-result';

const AddCharButton = Button.extend`
  margin-left: 0.5rem;
`;

const CharacterNotice = ({ children, value, action }) => (
  <label>
    {children}
    <DiceSelect
      trait={'notice'}
      id={children}
      onChange={action}
      value={value}
    />
    <br/>
  </label>
);

class PerceptionCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: {},
      rolls: {},
    };
  }

  updateNotice = (name) => (evt) => {
    console.log(name, evt.target.value);
    this.setState({
      characters: {
        ...this.state.characters,
        [name]: evt.target.value,
      }
    });
  }

  addCharacter = () => {
    const rawName = this.newCharacter.value;
    const name = rawName && (rawName[0].toUpperCase() + rawName.slice(1));
    this.newCharacter.value && this.setState({
      characters: {
        ...this.state.characters,
        [name]: 4,
      },
      rolls: {
        ...this.state.rolls,
        [name]: '-',
      }
    }, () => { this.newCharacter.value = '' }); // Reset form
  }

  perceptionCheck = () => {
    const noticeDice = this.state.characters;
    const noticeRolls = Object.keys(noticeDice).reduce(
      (acc, name) => ({
        ...acc,
        [name]: traitCheck(noticeDice[name]),
      }),
      {},
    );
    this.setState({ rolls: noticeRolls });
  }

  render() {
    return (
      <div className={'perception-check'}>
        <h3>Perception Check:</h3>
        <Input type="text" innerRef={nc => this.newCharacter = nc} />
        <AddCharButton onClick={this.addCharacter}>Add character</AddCharButton>
        <br />
        <br />
        {
          Object.keys(this.state.characters).map((name, i) => (
            <Fragment key={`${name}-${i}`}>
              <CharacterNotice
                key={`${name}-${i}`}
                value={this.state.characters[name]}
                action={this.updateNotice(name)}
              >
                {name}
              </CharacterNotice>
              <TraitResult roll={this.state.rolls[name]} isWildCard />
            </Fragment>
          ))
        }
        <br />
        <Button onClick={this.perceptionCheck}>Perception Check!</Button>
      </div>
    );
  }
}

export default PerceptionCheck;
