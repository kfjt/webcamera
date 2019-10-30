import React, { useRef, useState } from 'react'
import './App.css'

// import Realsense from './Realsense'
// import { DepthWebgl } from './DepthView'
// import WebCamera from './WebCamera'
// import VRScene from './VRScene'
import Geolocation from './Geolocation'
import ARScene from './ARScene'
// import { BallModelViewer } from './ModelViewer'

const App = () => {
  // const videoRGB = useRef()
  // const videoDepth = useRef()

  const [geolocation, setGeolocation] = useState()

  return (
    <div className="App">
      {/* <Realsense videoRGB={videoRGB} videoDepth={videoDepth} /> */}
      {/* <DepthWebgl videoDepth={videoDepth} /> */}
      <ARScene geolocation={geolocation} />
      {/* <WebCamera /> */}
      <Geolocation setGeolocation={setGeolocation} />
      {/* <VRScene /> */}
      {/* <BallModelViewer /> */}
    </div>
  )
}

export default App
