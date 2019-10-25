import React from 'react'
import './App.css'

import WebCamera from './WebCamera'
import VRScene from './VRScene'
import Geolocation from './Geolocation'
// import ARScene from './ARScene'

const App = () => {
  const relative = { position: 'relative' }
  const absolute = { position: 'absolute', top: 0, left: 0 }
  return (
    <div className="App" style={relative}>
      <WebCamera position={absolute} />
      {/* <ARScene position={absolute} /> */}
      <Geolocation position={absolute} />
      <VRScene position={absolute} />
    </div>
  )
}

export default App
