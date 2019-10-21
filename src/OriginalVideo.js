import React, {useRef, useEffect} from 'react'

const OriginalVideo = props => {
  const {videoEl} = props
  const canvasEl = useRef(null)

  useEffect(() => {
    const video = videoEl.current
    const canvas = canvasEl.current

    const drawFrame = async () => {
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      requestAnimationFrame(drawFrame)
    }

    const play = async () => {
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.style.display = 'none'
      }
      const funcloadeddata = video.onloadeddata
      video.onloadeddata = () => {
        if ( funcloadeddata ) funcloadeddata()
        drawFrame()
      }
      video.play()
    }
    play()
  }, [videoEl])
  

  return (<canvas ref={canvasEl} />)
}

export default OriginalVideo
