import React, {Component} from 'react'
import { injectState } from "freactal";
import BookShelf from './BookShelf'


class BooksList extends Component {

  render() {
    const shelves = this.props.state.shelves.filter(s => s.key !== 'none')
    return shelves.map(s => <BookShelf key={s.key} shelf={s} />)
  }

} // class BooksList

export default injectState(BooksList)
