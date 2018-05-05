import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectState } from 'freactal'
import { Route } from 'react-router-dom'
import _ from 'lodash'


class Book extends Component {

  getBookShelf() {
    if( this.props.book.shelf ) {
      return this.props.book.shelf
    }

    const myBook = _.find(this.props.state.books, {id: this.props.book.id})
    return myBook ? myBook.shelf : 'none'
  }

  changeShelf = (ev) => {
    this.props.effects.setBookShelf(this.props.book, ev.target.value)
  }

  render() {
    const book = this.props.book
    const bookShelf = this.getBookShelf()

    let bookImg = null
    if( book.imageLinks ) {
      bookImg = book.imageLinks.thumbnail || book.imageLinks.smallThumbnail || null
    }

    let authors = '- Unknown -'
    if( Array.isArray(book.authors) ) {
      authors = book.authors.join(', ')
    }

    return (
      <Route render={({history}) => (
        <article className="book" onClick={() => history.push('/'+ book.id)} aria-label={book.title}>
          <div className="book-top">
            <div className="book-cover" style={{backgroundImage: 'url('+ bookImg +')'}}></div>
            <div className="book-shelf-changer" onClick={ev => ev.stopPropagation()}>
              <select defaultValue={bookShelf} onChange={this.changeShelf} aria-label={'Change shelf of '+ book.title}>
                <option value="" disabled>Move to...</option>
                {this.props.state.shelves.map(s => <option key={s.key} value={s.key}>{s.lbl}</option>)}
              </select>
            </div>
          </div>
          <h3 className="book-title">{book.title}</h3>
          <div className="book-authors">{authors}</div>
        </article>
      )} />
    )
  }

} // class Book

Book.propTypes = {
  book: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  effects: PropTypes.object.isRequired,
}

export default injectState(Book)
