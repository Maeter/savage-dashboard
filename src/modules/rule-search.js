import React, { Component, Fragment } from 'react';
import generateKey from 'shortid';
import styled from 'styled-components';

import filter from 'lodash/filter';
import throttle from 'lodash/throttle';
import concat from 'lodash/concat';

import rules from '../rules';

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

const SelectedRule = styled.p`
  line-height: 1.5;
`;

const SectionTitle = styled.h4`
  margin-bottom: 0;
`;

class RuleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesets: rules,
      term: '',
      results: [],
      selectedResult: {
        text: '',
        index: null,
      },
    };
  }

  updateTerm = () => {
    if (this.input.value.length > 2) {
      const { rulesets } = this.state;
      const val = this.input.value.toLowerCase();
      const rx = new RegExp(val);

      const results = Object.keys(rulesets).reduce((acc, rulesetKey) => {
        const currRuleset = rulesets[rulesetKey];
        acc[rulesetKey] = filter(
          currRuleset.titles,
          (item) => rx.test(item.text.toLowerCase()),
        );
        return acc;
      }, {});

      this.setState({
        term: val,
        results,
      });
    }
  };

  displayRule = (item) => {
    const { texts } = this.state.rulesets[item.book];
    const range = texts
      .slice(item.indexStart + 1, item.indexEnd)
      .map(i => i.text);
    this.setState({
      selectedResult: {
        index: item.indexStart,
        text: range.join(''),
      }
    });
  }

  throttledUpdateTerm = throttle(this.updateTerm, 800);

  render() {
    const { results, selectedResult } = this.state;
    return (
      <div className={'rule-search'}>
        <h3>Search rules</h3>
        <Input type="text" onChange={this.throttledUpdateTerm} innerRef={x => this.input = x}/>
        <br/>
        {Object.keys(results).map((rulesetName) => {
          const currRuleset = results[rulesetName];
          const dashedRulesetName = rulesetName.toLowerCase().replace(' ', '-');
          return currRuleset.length === 0 ? null : (
            <section class={`rules-${dashedRulesetName}`}>
              <SectionTitle>{rulesetName}</SectionTitle>
              {
                currRuleset.map((item, i) =>
                  <Term
                    key={i}
                    onClick={() => this.displayRule(item)}
                    selected={selectedResult.index === item.indexStart}
                  >
                    {item.text}
                  </Term>
                )
              }
            </section>
          );
        })}
        <br/>
        <br/>
        <SelectedRule>{this.state.selectedResult.text}</SelectedRule>
        <br/>
      </div>
    );
  }
}

export default RuleSearch;
