import React from 'react';
import axios from 'axios';
import * as _ from 'underscore';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'Agnes Martin'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.props);
    const { onSearch } = this.props;
    const { query } = this.state;
    onSearch(query);
  }


  render() {
    const { query } = this.state;
    return (
      // <h2>Search</h2>
      <>
        <div className="input-group">
          <input type="search" className="form-control rounded" value={query} onChange={this.handleChange} placeholder="Search" aria-label="Search"
            aria-describedby="search-addon" />
          <button type="button" className="btn btn-outline-primary" onClick={this.handleClick}>search</button>
        </div>
      </>
    );
  }
}

export default Search;