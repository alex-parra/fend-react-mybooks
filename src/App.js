import React from 'react'
import { Route, Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import BooksSearch from './BooksSearch'


class BooksApp extends React.Component {

  state = {
    books: [],
  }

  loadBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <BooksList shelves={BooksAPI.shelves} books={this.state.books} loadbooks={() => this.loadBooks()} />
            <div className="open-search"><Link to="/search">Add a book</Link></div>
          </div>
        )} />

        <Route path="/search" component={BooksSearch}/>
      </div>
    )
  }
}

export default BooksApp
