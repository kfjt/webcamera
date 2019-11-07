import React, { useRef } from 'react'
import './App.css'

import Realsense from './Realsense'
import DepthView from './DepthView'
// import WebCamera from './WebCamera'
// import VRScene from './VRScene'
// import Geolocation from './Geolocation'
// import ARScene from './ARScene'
// import {BallModelViewer} from './ModelViewer'

const App = () => {
  const videoRGB = useRef()
  const videoDepth = useRef()

  return (
    <div className="App">
      <Realsense videoRGB={videoRGB} videoDepth={videoDepth} />
      <DepthView videoDepth={videoDepth} />
    </div>
  )
}

export default App
