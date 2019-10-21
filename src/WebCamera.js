import React, {useRef} from 'react'

import useVideo from './useVideo'
import OriginalVideo from './OriginalVideo'
import Keypoints from './Keypoints'

// TODO: .layer {position: 'absolute'}
const WebCamera = () => {
  const video = useRef(null)
  useVideo(video)

  return (
    <div className="WebCamera">
      <video className="Input" ref={video} />
      <div className="Output" >
        <OriginalVideo className="layer" videoEl={video} />
        <Keypoints className="layer" videoEl={video} />
      </div>
    </div>
  )
}

export default WebCamera
