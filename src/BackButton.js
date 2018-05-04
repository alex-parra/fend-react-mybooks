import React, {Component} from 'react'


class BackButton extends Component {

  goBack() {
    const history = this.props.history
    history.length > 2 ? history.goBack() : history.push('/')
  }

  render() {
    return <a className="goBack" onClick={() => this.goBack()}>Go back</a>
  }

}

export default BackButton
