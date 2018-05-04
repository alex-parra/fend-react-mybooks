import React from 'react'

export default (props) => <main>
  <div className="page404">
    <h2>Oops! <small>Something went wrong...</small></h2>
    <button onClick={() => props.history.goBack()}>Go back</button>
  </div>
</main>
