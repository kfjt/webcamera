import React, {useRef, useEffect} from 'react'
import './App.css'
import WebCamera from './WebCamera'
// import Keypoints from './Keypoints'

const App = () => {
  const videoEl = useRef(null)
  
  useEffect(() => {
    const video = videoEl.current
    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        video.srcObject = await mediaDevices.getUserMedia({video: true})
      }
    }
    setVideoStream()
  })

  return (
    <div className="App">
      <video ref={videoEl} />
      <WebCamera videoEl={videoEl} />
      {/* <Keypoints video={cameraEl} /> */}
    </div>
  )
}

export default App
