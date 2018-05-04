import React, {Component} from 'react'
import {injectState} from 'freactal'
import * as API from './BooksAPI'
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
    if( myBooksBook ) {
      return this.setState({book: myBooksBook, loaded: true})
    }

    // Not in shelves. Check if found in searchResults
    const searchBooksBook = _.find(appState.searchResults, {id: bookId})
    if( searchBooksBook ) {
      return this.setState({book: searchBooksBook, loaded: true})
    }

    // Not found in local state. Fetch from API. Propably direct URL access
    API.get(bookId).then(book => {
      this.setState({book: book, loaded: true})
    }).catch(err => {
      this.setState({book: null, loaded: true})
    })
  }

  render() {
    const appState = this.props.state
    const state = this.state

    if( state.loaded && _.get(state, 'book.id', false) === false ) {
      return <Page404 history={this.props.history} />
    }

    if( !state.loaded ) {
      return <main className="pageBook"><div className="search-no-results">Loading...</div></main>
    }

    const book = state.book
    const bookShelf = _.get(book, 'shelf', 'none')
    const bookShelfLbl = _.find(appState.shelves, {key: bookShelf}).lbl
    let bookDesc = _.get(book, 'description', '- NA -')

    return (
      <main className="pageBook">
        <div className="book-view">
          <h1>
            <small>{bookShelfLbl}</small>
            {book.title}
          </h1>
          <p><b>Authors:</b> {_.get(book, 'authors', []).join(', ')}</p>
          <p><b>Date Published:</b> {_.get(book, 'publishedDate', '- NA -')}</p>
          <p><b>Pages:</b> {_.get(book, 'pageCount', '- NA -')}</p>
          <p><b>Categories:</b> {_.get(book, 'categories', []).join(', ')}</p>
          <p><b>Rating:</b> {_.get(book, 'averageRating', '- NA -')}</p>
          <p className="book-desc"><b>Description:</b><br/>{bookDesc}</p>
        </div>
      </main>
    )
  }

} // PageBook

export default injectState(PageBook)
