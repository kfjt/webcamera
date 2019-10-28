import React from 'react'
import './App.css'

// import WebCamera from './WebCamera'
// import VRScene from './VRScene'
// import Geolocation from './Geolocation'
// import ARScene from './ARScene'
import ModelViewer from './ModelViewer'

const App = () => {
  const relative = { position: 'relative' }
  const absolute = { position: 'absolute', top: 0, left: 0 }
  return (
    <div className="App" style={relative}>
      {/* <ARScene position={absolute} /> */}
      {/* <WebCamera position={absolute} /> */}
      {/* <Geolocation position={absolute} /> */}
      {/* <VRScene position={absolute} /> */}
      <ModelViewer />
    </div>
  )
}

export default App
