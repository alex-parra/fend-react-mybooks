import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {injectState} from 'freactal'
import * as API from '../BooksAPI'
import Page404 from './Page404'
import _ from 'lodash'


class PageBook extends Component {

  state = {
    loaded: false,
    book: null
  }

  componentDidMount() {
    const appState = this.props.state
    const bookId = this.props.match.params.id

    // Check if we have this book in one of our shelves
    const myBooksBook = _.find(appState.books, {id: bookId})
    if( myBooksBook ) return this.setBook(myBooksBook)

    // Not in shelves. Check if found in searchResults
    const searchBooksBook = _.find(appState.searchResults, {id: bookId})
    if( searchBooksBook ) this.setBook(searchBooksBook)

    // Not found in local state. Fetch from API. Propably direct URL access
    API.get(bookId).then(book => this.setBook(book)).catch(err => this.setBook())
  }

  setBook(book = null) {
    const appState = this.props.state
    const notAvailable = '- NA -'
    const bookShelf = _.get(book, 'shelf', 'none')
    const bookAuthors = _.get(book, 'authors', [])
    const bookCategories = _.get(book, 'categories', [])
    const bookData = {
      id: _.get(book, 'id', false),
      title: _.get(book, 'title', notAvailable),
      shelf: bookShelf,
      shelfLbl: _.find(appState.shelves, {key: bookShelf}).lbl,
      authors: bookAuthors.length > 0 ? bookAuthors.join(', ') : notAvailable,
      date: _.get(book, 'publishedDate', notAvailable),
      pages: _.get(book, 'pageCount', notAvailable),
      categories: bookCategories.length > 0 ? bookCategories.join(', ') : notAvailable,
      rating: _.get(book, 'averageRating', notAvailable),
      description: _.get(book, 'description', notAvailable),
    }
    this.setState({loaded: true, book: bookData})
  }

  render() {
    const state = this.state
    const book = state.book

    if( !state.loaded ) {
      return <main className="pageBook"><div className="search-no-results">Loading...</div></main>
    } else if( _.get(book, 'id', false) === false ) {
      return <Page404 history={this.props.history} />
    }

    return (
      <main className="pageBook">
        <article className="book-view">
          <h1>
            <small>{book.shelfLbl}</small>
            {book.title}
          </h1>
          <p><b>Authors:</b> {book.authors}</p>
          <p><b>Date Published:</b> {book.date}</p>
          <p><b>Pages:</b> {book.pages}</p>
          <p><b>Categories:</b> {book.categories}</p>
          <p><b>Rating:</b> {book.rating}</p>
          <p className="book-desc" aria-label="Book summary">{book.description}</p>
        </article>
      </main>
    )
  }

} // PageBook

PageBook.propTypes = {
  state: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default injectState(PageBook)
