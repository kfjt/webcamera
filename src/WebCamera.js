import React, { useRef, useState } from 'react'

import VideoCamera from './VideoCamera'
import OriginalVideo from './OriginalVideo'
import Keypoints from './Keypoints'

const WebCamera = props => {
  const { position } = props
  const videoEl = useRef()
  const [deviceId, setDeviceId] = useState(null)
  const relative = { position: 'relative' }
  const absolute = { position: 'absolute', top: 0, left: 0 }

  if (!deviceId) {
    return (<div>select device</div>)
  }
  setDeviceId(1)

  return (
    <div className="WebCamera" style={position}>
      <VideoCamera className="Input" videoEl={videoEl} />
      <div className="Output" style={relative} >
        <OriginalVideo className="layer" style={absolute} videoEl={videoEl} />
        <Keypoints className="layer" style={absolute} videoEl={videoEl} />
      </div>
    </div>
  )
}

export default WebCamera
