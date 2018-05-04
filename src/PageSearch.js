import React, {Component} from 'react'
import { injectState } from "freactal";
import _ from 'lodash'
import Book from './Book'


class PageSearch extends Component {

  state = {
    loading: false,
  }

  noResults() {
    const appState = this.props.state
    return ( !this.state.loading && appState.searchQuery.length > 1 && appState.searchResults.length === 0)
  }

  handleInputChange = () => {
    this.setState({loading: true})
    this.props.effects.searchBooks(this.searchInput.value.trim()).then(() => { this.setState({loading: false}) })
  }

  render() {
    const appState = this.props.state
    return (
      <React.Fragment>
        <div className="search-box">
          <input type="text" autoFocus defaultValue={appState.searchQuery} placeholder="Search by title or author" ref={input => this.searchInput = input} onChange={_.debounce(this.handleInputChange, 250)}/>
        </div>
        <main className="search-results">
          {appState.searchQuery.length === 0 &&
            <div className="search-no-results">
              Type something in the search box<br/> to find great books to read.<br/><br/>
              <strong>Suggestions:</strong> javascript, android, ios
            </div>
          }
          {this.noResults() && <div className="search-no-results">No books found.</div>}
          {this.state.loading && <div className="search-no-results">Searching...</div>}
          <ol className="books-grid">
            {appState.searchResults.map(b => (<li key={b.id}><Book book={b} /></li>))}
          </ol>
        </main>
      </React.Fragment>
    )
  }

} // class PageSearch

export default injectState(PageSearch)
