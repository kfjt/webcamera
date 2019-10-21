import React, {useRef} from 'react'

import useVideo from './useVideo'
import OriginalVideo from './OriginalVideo'
import Keypoints from './Keypoints'

const WebCamera = () => {
  const video = useRef(null)
  useVideo(video)

  const absolute = { position: 'absolute' }
  return (
    <div className="WebCamera">
      <video className="Input" ref={video} />
      <div className="Output" style={{position: 'relative'}} >
        <OriginalVideo className="layer" style={absolute} videoEl={video} />
        <Keypoints className="layer" style={absolute} videoEl={video} />
      </div>
    </div>
  )
}

export default WebCamera
