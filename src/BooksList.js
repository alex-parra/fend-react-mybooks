import React, {Component} from 'react'
import BookShelf from './BookShelf'
import Book from './Book'

class BooksList extends Component {

  loadBooksList() {
    typeof(this.props.loadbooks) === 'function' && this.props.loadbooks()
  }

  componentDidMount() {
    this.loadBooksList()
  }

  render() {
    const shelves = this.props.shelves.filter(s => s.key !== 'none')
    const books = this.props.books

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(s => {
              const shelfBooks = books.filter(b => b.shelf === s.key)
              return (
                <BookShelf key={s.key} shelf={s} books={shelfBooks}>
                  {shelfBooks.map(b => <Book key={b.id} book={b} changeshelf={() => this.loadBooksList()} />)}
                </BookShelf>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

}

export default BooksList
