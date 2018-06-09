import React, { Component } from 'react';
import { traitCheck } from '../services/dice';

const CharacterNotice = ({ children, value, action }) => (
  <label>
    {children}
    <input type="number" value={value} onChange={action}/>
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
    this.setState({
      characters: {
        ...this.state.characters,
        [name]: evt.target.value,
      }
    });
  }

  addCharacter = () => {
    this.setState({
      characters: {
        ...this.state.characters,
        [this.newCharacter.value]: 4,
      }
    }, () => { this.newCharacter.value = '' });
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
        <input type="text" ref={nc => this.newCharacter = nc}/>
        <button onClick={this.addCharacter}>Add character</button>
        <br />
        <br />
        {
          Object.keys(this.state.characters).map((name, i) => (
            <CharacterNotice
              key={i}
              value={this.state.characters[name]}
              action={this.updateNotice(name)}
            >
              {name}
            </CharacterNotice>
          ))
        }
        <br />
        <ul>
          {
            Object.keys(this.state.rolls).map((name, i) => (
              <li key={i}>
                {name}:{this.state.rolls[name]}
              </li>
            ))
          }
        </ul>
        <button onClick={this.perceptionCheck}>Perception Check!</button>
      </div>
    );
  }
}

export default PerceptionCheck;
