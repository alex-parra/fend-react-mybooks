import React, {Component} from 'react'
import { injectState } from "freactal";
import Book from './Book'


class BookShelf extends Component {

  render() {
    const appState = this.props.state
    const shelfBooks = appState.books.filter(b => b.shelf === this.props.shelf.key)

    return (
      <section className="bookshelf" aria-label={'Books Shelf '+ this.props.shelf.lbl}>
        <h2 className="bookshelf-title">{this.props.shelf.lbl} <span>{shelfBooks.length} books</span></h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {appState.books.length === 0 && (<li className="no-books">Loading...</li>)}
            {appState.books.length !== 0 && shelfBooks.length === 0 && (<li className="no-books">No books in this shelf.</li>)}
            {shelfBooks.map(b => <li key={b.id}><Book book={b} /></li>)}
          </ol>
        </div>
      </section>
    )
  }

} // class BookShelf

export default injectState(BookShelf)
