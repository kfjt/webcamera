import {useEffect} from 'react'

const useVideo = e => {
  useEffect(() => {
    const video = e.current
    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        video.srcObject = await mediaDevices.getUserMedia({video: { facingMode: 'environment' }})
      }
    }
    setVideoStream()
  }, [e])
  return e
}

export default useVideo
