import React, {Component} from 'react'
import {update as apiUpdate, shelves} from './BooksAPI'

class Book extends Component {

  state = {
    shelf: this.props.book.shelf || 'none'
  }

  changeShelf = (ev) => {
    this.setState({shelf: ev.target.value}, () => {
      apiUpdate(this.props.book, this.state.shelf).then(() => {
        typeof(this.props.changeshelf) === 'function' && this.props.changeshelf()
      });
    });
  }

  render() {
    const book = this.props.book

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
            <select defaultValue={this.state.shelf} onChange={this.changeShelf}>
              <option value="" disabled>Move to...</option>
              {shelves.map(s => <option key={s.key} value={s.key}>{s.lbl}</option>)}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}


export default Book
