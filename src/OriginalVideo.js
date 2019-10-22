import React, {useRef, useEffect} from 'react'

const OriginalVideo = props => {
  const {videoEl} = props
  const canvasEl = useRef(null)

  useEffect(() => {
    const video = videoEl.current
    const canvas = canvasEl.current

    const drawFrame = () => {
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      requestAnimationFrame(drawFrame)
    }

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      video.style.display = 'none'
    })
    video.addEventListener('loadeddata', video.play)
    video.addEventListener('loadeddata', drawFrame)
  }, [videoEl])
  

  return (<canvas className="OriginalVideo" ref={canvasEl} style={props.style} />)
}

export default OriginalVideo
