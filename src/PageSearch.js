import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { injectState } from "freactal";
import _ from 'lodash'
import Book from './Book'


class PageSearch extends Component {

  state = {
    loading: false,
  }

  noResults() {
    const appState = this.props.state
    return ( !this.state.loading && appState.searchQuery > 1 && appState.searchResults.length === 0)
  }

  handleInputChange = () => {
    this.setState({loading: true})
    this.props.effects.searchBooks(this.searchInput.value).then(() => { this.setState({loading: false}) })
  }

  render() {
    const appState = this.props.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" defaultValue={appState.searchQuery} placeholder="Search by title or author" ref={input => this.searchInput = input} onChange={_.debounce(this.handleInputChange, 250)}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.noResults() && <div className="search-no-results">No books found.</div>}
          {this.state.loading && <div className="search-no-results">Loading...</div>}
          <ol className="books-grid">
            {appState.searchResults.map(b => (<li key={b.id}><Book book={b} /></li>))}
          </ol>
        </div>
      </div>
    )
  }

} // class PageSearch

export default injectState(PageSearch)
