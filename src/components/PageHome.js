import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { injectState } from "freactal";
import BookShelf from './BookShelf'


class PageHome extends Component {

  render() {
    const shelves = this.props.state.shelves.filter(s => s.key !== 'none')
    return (
      <main>
        {shelves.map(s => <BookShelf key={s.key} shelf={s} />)}
        <Link className="open-search" to="/search">Add a book</Link>
      </main>
    )
  }

} // class PageHome

PageHome.propTypes = {
  state: PropTypes.object.isRequired,
}

export default injectState(PageHome)
