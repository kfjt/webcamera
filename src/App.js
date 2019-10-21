import React, {useRef, useEffect} from 'react'
import './App.css'
import WebCamera from './WebCamera'
// import Keypoints from './Keypoints'

const App = () => {
  const video = useRef(null)
  const videoEl = useVideo(video)

  return (
    <div className="App">
      <video ref={video} />
      <WebCamera videoEl={videoEl} />
      {/* <Keypoints video={cameraEl} /> */}
    </div>
  )
}

const useVideo = videoEl => {
  useEffect(() => {
    const video = videoEl.current
    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        video.srcObject = await mediaDevices.getUserMedia({video: true})
      }
    }
    setVideoStream()
  }, [videoEl])
  return videoEl
}

export default App
