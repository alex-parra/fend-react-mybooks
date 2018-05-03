import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'


class BooksSearch extends Component {

  state = {
    query: '',
    loading: false,
    books: []
  }

  isLoading() {
    return (this.state.loading === true)
  }

  noResults() {
    return (this.state.query.length > 1 && this.state.books.length === 0 && this.state.loading === false)
  }

  searchBooks() {
    if( this.state.query.length === 0 ) {
      this.setState({books: []})
      return
    }

    this.setState({loading: true})
    BooksAPI.search(this.state.query).then(books => {
      const booksList = Array.isArray(books) ? books : []
      this.setState({books: booksList, loading: false})
    })
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
            {this.state.books.map(b => (<li key={b.id}><Book book={b} /></li>))}
          </ol>
        </div>
      </div>
    )
  }

}

export default BooksSearch
