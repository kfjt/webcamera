import React, { useRef, useState } from 'react'
import './App.css'

import Realsense from './Realsense'
// import { DepthWebgl } from './DepthView'
import WebCamera from './WebCamera'
import Geolocation from './Geolocation'
import { BallModelViewer } from './ModelViewer'
// import VRScene from './VRScene'
// import ARScene from './ARScene'

const App = () => {
  const videoRGB = useRef()
  const videoDepth = useRef()

  const [geolocation, setGeolocation] = useState()
  console.log(geolocation)

  return (
    <div className="App">
      <Realsense videoRGB={videoRGB} videoDepth={videoDepth} />
      {/* <DepthWebgl videoDepth={videoDepth} /> */}
      <WebCamera />
      <Geolocation setGeolocation={setGeolocation} />
      <BallModelViewer />
      {/* <VRScene /> */}
      {/* <ARScene geolocation={geolocation} /> */}
    </div>
  )
}

export default App
