import React from 'react'
import { Route } from "react-router-dom";
import { wrapComponentWithState } from "./state";
import PageHome from './PageHome'
import PageSearch from './PageSearch'
import './App.css'


class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={PageHome} />
        <Route path="/search" component={PageSearch}/>
      </div>
    )
  }

} // class BooksApp

export default wrapComponentWithState(BooksApp)
