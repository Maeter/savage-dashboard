import React, { Component } from 'react';
import generateKey from 'shortid';

import filter from 'lodash/filter';
import throttle from 'lodash/throttle';
import rules from '../assets/rules';

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
    };
  }

  updateTerm = () => {
    const val = this.input.value;
    const rx = new RegExp(val);
    const results = filter(
      rules,
      (item) => item.keywords.reduce((acc, i) => acc || rx.test(i), false),
    ) || this.state.results; // Keep the previous selection if no match
    this.setState({
      term: val,
      selected: results && (results[0] || {}),
      results,
    });
  };

  throttledUpdateTerm = throttle(this.updateTerm, 800);

  renderTexts = texts =>
    texts && texts.map((t, i) => (<p key={generateKey()}>{t}</p>));

  renderTables = tables => (
    <table>
      <tbody>
        {tables && tables.map((col, i) => (
          <tr key={generateKey()}>
            {col.map((val, j) => (<td key={generateKey()}>{val}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  render() {
    const { results, selected } = this.state;
    return (
      <div className={'rule-search'}>
        <h3>Search rules</h3>
        <input type="text" onChange={this.throttledUpdateTerm} ref={x => this.input = x}/>
        <br/>
        {results.map((res, i) => <span key={i}>{res.id}, </span>)}
        <br/>
        <br/>
        {selected.keywords && selected.keywords.map((k, i) => <span key={i}>{k}, </span>)}
        <br/>
        <br/>
        {this.renderTexts(this.state.selected.texts)}
        <br/>
        {this.renderTables(this.state.selected.tables)}
      </div>
    );
  }
}

export default RuleSearch;
