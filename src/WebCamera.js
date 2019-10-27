import React, { useRef } from 'react'

import useVideo from './useVideo'
import OriginalVideo from './OriginalVideo'
import Keypoints from './Keypoints'

const WebCamera = props => {
  const { position } = props
  const video = useRef(null)
  const relative = { position: 'relative' }
  const absolute = { position: 'absolute', top: 0, left: 0 }

  useVideo(video)

  return (
    <div className="WebCamera" style={position}>
      <video className="Input" ref={video} />
      <div className="Output" style={relative} >
        <OriginalVideo className="layer" style={absolute} videoEl={video} />
        <Keypoints className="layer" style={absolute} videoEl={video} />
      </div>
    </div>
  )
}

export default WebCamera
