import React, {Component} from 'react'
import PropTypes from 'prop-types';


class BackButton extends Component {

  goBack() {
    const history = this.props.history
    history.length > 2 ? history.goBack() : history.push('/')
  }

  render() {
    return <a className="goBack" onClick={() => this.goBack()}>Go back</a>
  }

}

BackButton.propTypes = {
  history: PropTypes.object.isRequired
}

export default BackButton
