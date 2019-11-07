import React, { useRef, useEffect } from 'react'

const DepthView = props => {
  const { videoDepth } = props
  const depthView = useRef()
  const frame = useRef(0)

  useEffect(() => {
    const video = videoDepth.current
    const canvas = depthView.current

    // const invert = data => {
    //   for (let i = 0; i < data.length; i += 4) {
    //     data[i] = 255 - data[i]         // red
    //     data[i + 1] = 255 - data[i + 1] // green
    //     data[i + 2] = 255 - data[i + 2] // blue
    //   }
    // }
    const color = data => {
      for (let index = 0; index < data.length; index += 4) {
        const x = (data[index] * 1000) % 240
        data[index] = x
        data[index + 1] = x
        data[index + 2] = 0
        // data[index + 3] *= 0.5
      }
    }

    const drawFrame = () => {
      // if (60 < frame.current) {
      //   video.pause()
      // }
      frame.current += 1
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      color(imageData.data)
      ctx.putImageData(imageData, 0, 0)
      requestAnimationFrame(drawFrame)
    }

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    })
    video.addEventListener('loadeddata', drawFrame)
  }, [videoDepth, frame])


  return (<canvas className="DepthView" ref={depthView} />)
}

export default DepthView
