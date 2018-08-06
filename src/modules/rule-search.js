import React, { Component } from 'react';
import generateKey from 'shortid';
import styled from 'styled-components';

import filter from 'lodash/filter';
import throttle from 'lodash/throttle';
import ruleset from '../assets/swd_json.json';

import Input from '../components/input';
import Button from '../components/button';

// @todo: use grid :)
const Term = styled(Button)`
  margin: 0.5rem 0.5rem 0 0;
  ${p => p.selected && `
    background: #afafaf;
    border: 2px black solid;
  `}
`;

class RuleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      selected: {
        keywords: [],
        texts: [],
        tables: [],
      },
      results: [],
      selectedResult: {
        text: '',
        index: null,
      },
    };
  }

  componentDidMount() {
    let prevIndex = 0;
    const titles = ruleset.filter(
      (text, index) => {
        const isTitle = text.fontSize === 15 // Remove subtitles
          && isNaN(text.text) // Remove page numbers
          && text.text.indexOf('....') === -1; // Remove index entries
        if(isTitle) {
          ruleset[prevIndex].indexEnd = index;
          ruleset[index].indexStart = index;
          prevIndex = index;
        }
        return isTitle;
    });
    this.setState({ texts: ruleset, titles });
  }

  updateTerm = () => {
    if(this.input.value.length >2){
      const val = this.input.value.toLowerCase();
      const rx = new RegExp(val);
      const results = filter(
        this.state.titles,
        (item) => rx.test(item.text.toLowerCase()),
      ) || this.state.results; // Keep the previous selection if no match
      this.setState({
        term: val,
        selected: results && (results[0] || {}),
        results,
      });
    }
  };

  displayRule = (item) => {
    const { texts } = this.state;
    const range = texts.slice(item.indexStart + 1, item.indexEnd).map(i => i.text);
    this.setState({
      selectedResult: {
        index: item.indexStart,
        text: range.join(''),
      }
    });
  }

  throttledUpdateTerm = throttle(this.updateTerm, 800);

  render() {
    const { results, selected } = this.state;
    return (
      <div className={'rule-search'}>
        <h3>Search rules</h3>
        <Input type="text" onChange={this.throttledUpdateTerm} innerRef={x => this.input = x}/>
        <br/>
        {results.map((item, i) =>
          <Term
            key={i}
            onClick={() => this.displayRule(item)}
            selected={this.state.selectedResult.index === item.indexStart}
            test={console.log(i, this.state.selectedResult.index === item.indexStart)}
          >
            {item.text}
          </Term>
        )}
        <br/>
        {selected.keywords && selected.keywords.map((k, i) => <span key={i}>{k}, </span>)}
        <br/>
        <br/>
        <p>{this.state.selectedResult.text}</p>
        <br/>
      </div>
    );
  }
}

export default RuleSearch;
