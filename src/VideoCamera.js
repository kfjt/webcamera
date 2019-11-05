import React, { useEffect } from 'react'

const VideoCamera = props => {
  const { videoEl } = props

  useEffect(() => {
    const video = videoEl.current
    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        video.srcObject = await mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      }
    }
    setVideoStream()
  }, [videoEl])

  return <video ref={videoEl} />
}

export default VideoCamera
