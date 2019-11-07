import React, { useEffect } from 'react'

const Realsense = props => {
  const { videoRGB, videoDepth } = props

  useEffect(() => {
    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (!mediaDevices) return
      if (!mediaDevices.enumerateDevices) return
      if (!mediaDevices.getUserMedia) return

      const getDevice = label => {
        // Intel(R) RealSense(TM) Depth Camera 435i RGB (8086:0b3a)
        // Intel(R) RealSense(TM) Depth Camera 435i Depth (8086:0b3a)
        const countDepth = label.split(' ').filter(v => v === 'Depth').length
        if (countDepth === 1) return videoRGB.current
        if (countDepth === 2) return videoDepth.current
      }

      const setupDevice = async ({ device, deviceId }) => {
        device.srcObject = await mediaDevices.getUserMedia({ video: { deviceId } })
        device.addEventListener('loadeddata', device.play)
      }

      const mediaDeviceInfo = await mediaDevices.enumerateDevices()
      mediaDeviceInfo
        .filter(v => v.kind === 'videoinput')
        .forEach(v => setupDevice({ device: getDevice(v.label), deviceId: v.deviceId }))
    }
    setVideoStream()
  }, [videoRGB, videoDepth])

  return (
    <div className="Realsense">
      <video className="RGB" ref={videoRGB} />
      <video className="Depth" ref={videoDepth} />
    </div>
  )
}

export default Realsense
