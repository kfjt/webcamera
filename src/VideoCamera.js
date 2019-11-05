import React, { useEffect } from 'react'

const VideoCamera = props => {
  const { videoEl, deviceId } = props

  useEffect(() => {
    const video = videoEl.current
    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        video.srcObject = await mediaDevices.getUserMedia({ video: { deviceId, facingMode: 'environment' } })
      }
    }
    setVideoStream()
  }, [videoEl, deviceId])

  return <video ref={videoEl} />
}

export default VideoCamera
