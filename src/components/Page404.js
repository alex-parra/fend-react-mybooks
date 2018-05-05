import React, {Component} from 'react'
import BackButton from './BackButton'
import PropTypes from 'prop-types';


class Page404 extends Component {

  render() {
    return (
      <main>
        <div className="page404">
          <h2>Oops! <small>Something went wrong...</small></h2>
          <BackButton history={this.props.history} />
        </div>
      </main>
    )
  }

}

Page404.propTypes = {
  history: PropTypes.object.isRequired
};

export default Page404
