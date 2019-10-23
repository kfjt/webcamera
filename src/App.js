import React from 'react'
import './App.css'

import WebCamera from './WebCamera'
import VRScene from './VRScene'
import Geolocation from './Geolocation'

const App = () => {
  return (
    <div className="App" style={{position: 'relative'}}>
      <WebCamera style={{position: 'absolute'}} />
      <Geolocation style={{position: 'absolute'}} />
      <VRScene style={{position: 'absolute'}} />
    </div>
  )
}

export default App
