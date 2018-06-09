import React, { Component } from 'react';
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

  updateTerm = (evt) => {
    const rx = new RegExp(`${evt.target.value}`);
    const results = filter(
      rules,
      (item) => item.keywords.reduce((acc, i) => acc || rx.test(i), false),
    ) || this.state.results; // Keep the previous selection if no match
    this.setState({
      term: evt.target.value,
      selected: results && results[0] || {},
      results,
    });
  }

  renderTexts = texts => texts && texts.map((t, i) => (<p key={i}>{t}</p>));

  renderTables = tables => (
    <table>
      {tables && tables.map((col, i) => (
        <tr key={i}>
          {col.map((val, j) => (<td>{val}</td>))}
        </tr>
      ))}
    </table>
  );

  render() {
    return (
      <div className={'rule-search'}>
        <h3>Search rules</h3>
        <input type="text" onChange={this.updateTerm}/>
        <br/>
        {this.state.results.map((res, i) => <span key={i}>{res.id}, </span>)}
        <br/>
        <br/>
        {this.state.selected.keywords.map((k, i) => <span key={i}>{k}, </span>)}
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
