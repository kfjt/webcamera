import React, {useRef} from 'react'
import './App.css'

import useVideo from './useVideo'
import WebCamera from './WebCamera'
import Keypoints from './Keypoints'

// TODO: .layer {position: 'absolute'}
const App = () => {
  const video = useRef(null)
  useVideo(video)

  return (
    <div className="App">
      <video className="Input" ref={video} />
      <div className="Output" >
        <WebCamera className="layer" videoEl={video} />
        <Keypoints className="layer" videoEl={video} />
      </div>
    </div>
  )
}

export default App
