import React from 'react'
import { Switch, Route, withRouter, Link } from "react-router-dom";
import { wrapComponentWithState } from "./state";
import PageHome from './PageHome'
import PageSearch from './PageSearch'
import PageBook from './PageBook'
import Page404 from './Page404'
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <header className="appHeader">
          <h1><Link to="/">MyBooks</Link></h1>
          {this.props.location.pathname !== '/' && <a className="goBack" tabIndex="0" onClick={() => this.props.history.goBack()}>Go back</a>}
        </header>
        <Switch>
          <Route exact path="/" component={PageHome} />
          <Route exact path="/search" component={PageSearch} />
          <Route exact path="/:id" component={PageBook} />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }

} // class BooksApp

export default wrapComponentWithState(withRouter(BooksApp))
