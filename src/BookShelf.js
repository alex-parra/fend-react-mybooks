import React, {Component} from 'react'
import { injectState } from "freactal";
import Book from './Book'


class BookShelf extends Component {

  render() {
    const shelfBooks = this.props.state.books.filter(b => b.shelf === this.props.shelf.key)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.lbl}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.length === 0 && (<li className="no-books">No books to show</li>)}
            {shelfBooks.map(b => <li key={b.id}><Book book={b} /></li>)}
          </ol>
        </div>
      </div>
    )
  }

} // class BookShelf

export default injectState(BookShelf)
