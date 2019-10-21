import React, {useRef, useEffect} from 'react'
import './App.css'
import WebCamera from './WebCamera'
// import Keypoints from './Keypoints'
import useVideo from './useVideo'

const App = () => {
  const video = useRef(null)
  useVideo(video)

  return (
    <div className="App">
      <video ref={video} />
      <WebCamera videoEl={video} />
      {/* <Keypoints video={cameraEl} /> */}
    </div>
  )
}

export default App
