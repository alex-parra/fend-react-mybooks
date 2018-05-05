import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Switch, Route, Link } from "react-router-dom";
import { wrapComponentWithState } from "./state";
import { injectState } from 'freactal'
import BackButton from './components/BackButton'
import PageHome from './components/PageHome'
import PageSearch from './components/PageSearch'
import PageBook from './components/PageBook'
import Page404 from './components/Page404'
import Loading from './components/Loading'
import './css/App.css'


class BooksApp extends Component {

  render() {
    const appState = this.props.state
    return (
      <Route render={props => (
        <div className="app">
          <header className="appHeader">
            <h1><Link to="/">MyBooks</Link></h1>
            {props.location.pathname !== '/' && <BackButton history={props.history} />}
          </header>
          <Switch>
            <Route exact path="/" component={PageHome} />
            <Route exact path="/search" component={PageSearch} />
            <Route exact path="/:id" component={PageBook} />
            <Route component={Page404} />
          </Switch>
          {appState.loading === true && <Loading />}
        </div>
      )} />
    )
  }

} // class BooksApp

BooksApp.propTypes = {
  state: PropTypes.object.isRequired
}

export default wrapComponentWithState(injectState(BooksApp))
