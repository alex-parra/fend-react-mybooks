import React, {Component} from 'react'
import BackButton from './BackButton'

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

export default Page404
