import React from 'react'
import ReactDOM from 'react-dom'

import Synth from '../containers/Thereminvox'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Synth name="React" />,
    document.body.appendChild(document.createElement('div'))
  )
})
