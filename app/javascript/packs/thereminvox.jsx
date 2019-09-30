import React from 'react'
import ReactDOM from 'react-dom'

import Thereminvox from '../containers/Thereminvox'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Thereminvox name="React" />,
    document.body.appendChild(document.createElement('div'))
  )
})
