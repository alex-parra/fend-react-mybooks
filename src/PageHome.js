import React, {Component} from 'react'
import { Link } from "react-router-dom";
import BooksList from './BooksList'


class PageHome extends Component {

  render() {
    return (
      <main>
        <BooksList />
        <Link className="open-search" to="/search">Add a book</Link>
      </main>
    )
  }

} // class PageHome

export default PageHome
