import React, {Component} from 'react'
import {injectState} from 'freactal'
import * as API from './BooksAPI'
import Page404 from './Page404'
import _ from 'lodash'


class PageBook extends Component {

  state = {
    loaded: false,
    found: false,
    book: null,
    bookId: this.props.match.params.id
  }

  componentDidMount() {
    const appState = this.props.state
    const appStateBook = _.find(appState.books, {id: this.state.bookId})
    if( appStateBook ) {
      this.setState({book: appStateBook, loaded: true, found: true})
      return
    }
    API.get(this.state.bookId).then(book => {
      this.setState({book: book, loaded: true, found: true})
    }).catch(err => {
      this.setState({book: null, loaded: true, found: false})
    })
  }

  render() {
    const appState = this.props.state
    const state = this.state

    if( state.loaded && !state.found ) {
      return <Page404 />
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
