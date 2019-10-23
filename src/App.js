import React from 'react'
import './App.css'

import WebCamera from './WebCamera'
import VRScene from './VRScene'
import Geolocation from './Geolocation'

const App = () => {
  return (
    <div className="App">
      <Geolocation />
      <WebCamera />
      <VRScene />
    </div>
  )
}

export default App
