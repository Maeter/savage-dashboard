import React, { Component, Fragment } from 'react';
import generateKey from 'shortid';
import styled from 'styled-components';

import filter from 'lodash/filter';
import uniqBy from 'lodash/uniqBy';
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

const SelectedRule = styled.section`
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
        texts: [],
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
      console.log(results);
      this.setState({
        term: val,
        results,
      });
    }
  };

  displayRule = (rule) => {
    const { results } = this.state;
    console.log(results[rule.book], results[rule.book].filter(item => item.text === rule.text));
    const { ruleset } = this.state.rulesets[rule.book];
    const texts = results[rule.book]
      .filter(item => item.text === rule.text)
      .map((item, i) => ruleset
        .slice(item.indexStart + 1, item.indexEnd)
        .map(i => i.text)
        .join('')
      );
    // const range = ruleset
    //   .slice(rule.indexStart + 1, rule.indexEnd)
    //   .map(i => i.text);
    this.setState({
      selectedResult: {
        index: rule.indexStart,
        texts, //range.join(''),
      }
    });
  }

  listUniqueRules = (list, selectedItem) => {
    const keywords = [];
    return Object.keys(list).map((rulesetName, index) => {
      const currRuleset = list[rulesetName];
      const dashedRulesetName = rulesetName.toLowerCase().replace(' ', '-');
      return currRuleset.length === 0 ? null : (
        <section className={`rules-${dashedRulesetName}`} key={`rules-${dashedRulesetName}-${index}`}>
          <SectionTitle>{rulesetName}</SectionTitle>
          {
            currRuleset.map((item, i) => {
              const repeated = keywords.includes(item.text);
              repeated || keywords.push(item.text);
              return repeated ? null : (
                <Term
                  key={i}
                  onClick={() => this.displayRule(item)}
                  selected={selectedItem.index === item.indexStart}
                >
                  {item.text}
                </Term>
              );
            })
          }
        </section>
      );
    })
  }

  throttledUpdateTerm = throttle(this.updateTerm, 800);

  render() {
    const { results, selectedResult } = this.state;
    return (
      <div className={'rule-search'}>
        <h3>Search rules (Beta)</h3>
        <Input type="text" onChange={this.throttledUpdateTerm} innerRef={x => this.input = x}/>
        <br/>
        {this.listUniqueRules(results, selectedResult)}
        <br/>
        <br/>
        <SelectedRule>
          <ul>
            {this.state.selectedResult.texts.filter(t => !!t).map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </SelectedRule>
        <br/>
      </div>
    );
  }
}

export default RuleSearch;
