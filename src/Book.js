import React, {Component} from 'react'
import { injectState } from "freactal";
import _ from 'lodash'


class Book extends Component {

  getBookShelf() {
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
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{backgroundImage: 'url('+ bookImg +')'}}></div>
          <div className="book-shelf-changer">
            <select defaultValue={bookShelf} onChange={this.changeShelf}>
              <option value="" disabled>Move to...</option>
              {this.props.state.shelves.map(s => <option key={s.key} value={s.key}>{s.lbl}</option>)}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }

} // class Book

export default injectState(Book)
