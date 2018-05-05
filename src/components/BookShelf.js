import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectState } from "freactal";
import Book from './Book'


class BookShelf extends Component {

  state = {
    collapsed: false
  }

  toggle() {
    this.setState(prevState => ({collapsed: !prevState.collapsed}))
  }

  render() {
    const appState = this.props.state
    const shelfBooks = appState.books.filter(b => b.shelf === this.props.shelf.key)

    return (
      <section className="bookshelf" aria-label={'Books Shelf '+ this.props.shelf.lbl}>
        <h2 className={this.state.collapsed ? 'bookshelf-title collapsed' : 'bookshelf-title'} onClick={() => this.toggle()}>
          {this.props.shelf.lbl} <span>{shelfBooks.length} books</span>
        </h2>
        {this.state.collapsed === false && (
          <ol className="books-grid">
            {appState.books.length === 0 && (<li className="no-books">Loading...</li>)}
            {appState.books.length !== 0 && shelfBooks.length === 0 && (<li className="no-books">No books in this shelf.</li>)}
            {shelfBooks.map(b => <li key={b.id}><Book book={b} /></li>)}
          </ol>
        )}
      </section>
    )
  }

} // class BookShelf

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
}

export default injectState(BookShelf)
