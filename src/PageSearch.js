import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { injectState } from "freactal";
import _ from 'lodash'
import Book from './Book'


class PageSearch extends Component {

  state = {
    query: '',
    loading: false,
  }

  isLoading() {
    return (this.state.loading === true)
  }

  noResults() {
    return (this.state.query.length > 1 && this.props.state.searchResults.length === 0 && this.state.loading === false)
  }

  searchBooks() {
    this.setState({loading: true})
    this.props.effects.searchBooks(this.state.query).then(() => { this.setState({loading: false}) })
  }

  handleInputChange = () => {
    this.setState({query: this.search.value}, () => this.searchBooks())
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" ref={input => this.search = input} onChange={_.debounce(this.handleInputChange, 250)}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.noResults() && <div className="search-no-results">No books found.</div>}
          {this.isLoading() && <div className="search-no-results">Loading...</div>}
          <ol className="books-grid">
            {this.props.state.searchResults.map(b => (<li key={b.id}><Book book={b} /></li>))}
          </ol>
        </div>
      </div>
    )
  }

} // class PageSearch

export default injectState(PageSearch)
