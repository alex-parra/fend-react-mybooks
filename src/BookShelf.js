import React, {Component} from 'react'

class BookShelf extends Component {

  render() {
    const books = this.props.books

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.lbl}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length === 0 && (<li className="no-books">No books to show</li>)}
            {React.Children.map(this.props.children, (child, i) => <li>{child}</li>)}
          </ol>
        </div>
      </div>
    )
  }

}

export default BookShelf
