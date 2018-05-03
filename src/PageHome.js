import React, {Component} from 'react'
import { Link } from "react-router-dom";
import BooksList from './BooksList'


class PageHome extends Component {

  render() {
    return (
      <div>
        <BooksList />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }

} // class PageHome

export default PageHome
