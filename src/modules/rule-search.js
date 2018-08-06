import React, { Component } from 'react';
import generateKey from 'shortid';

import filter from 'lodash/filter';
import throttle from 'lodash/throttle';
import swdJson from '../assets/swd_json.json';

import Input from '../components/input';

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
      selectedResult: null,
    };
  }

  componentDidMount() {
    const orderedpages = swdJson.pages
      .sort((a, b) => a.pageId - b.pageId);
    const orderedTexts = orderedpages
      .reduce((acc, page) => [...acc, ...page.texts], []);
    let prevIndex = 0;
    const titles = orderedTexts.filter(
      (text, index) => {
        const isTitle = text.fontSize === 15 // Remove subtitles
          && isNaN(text.text) // Remove page numbers
          && text.text.indexOf('....') === -1; // Remove index entries
        if(isTitle) {
          orderedTexts[prevIndex].indexEnd = index;
          orderedTexts[index].indexStart = index;
          prevIndex = index;
        }
        return isTitle;
    });
    console.log(titles);
    this.setState({ texts: orderedTexts, titles });
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
      selectedResult: range.join(''),
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
        {results.map((res, i) => <span key={i} onClick={() => this.displayRule(res)}>{res.text} </span>)}
        <br/>
        {selected.keywords && selected.keywords.map((k, i) => <span key={i}>{k}, </span>)}
        <br/>
        <br/>
        <p>{this.state.selectedResult}</p>
        <br/>
      </div>
    );
  }
}

export default RuleSearch;
