import React from 'react'
import ReactDOM from 'react-dom'

import Noise from '../containers/Noise'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Noise />,
    document.body.appendChild(document.createElement('div'))
  )
})
