import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import initReactFastclick from 'react-fastclick'
import registerServiceWorker from './registerServiceWorker'

initReactFastclick()

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
)

registerServiceWorker()
