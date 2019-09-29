import React, {useRef, useEffect} from 'react'
import './App.css'

function App() {
  const videoEl = useRef(null)
  const canvasEl = useRef(null)
  const drawRef = useRef()

  const readyVideo = async video => () => {
    video.onloadedmetadata = () => {}
  }

  useEffect(() => {
    const video = videoEl.current
    const canvas = canvasEl.current
    ;(async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        const stream = await mediaDevices.getUserMedia({video: true})
        video.srcObject = stream
        await readyVideo(video)
      }
    })()
    video.play()
    video.style.display = 'none'

    const drawFrame = () => {
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
      canvas.width = videoWidth
      canvas.height = videoHeight

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
      drawRef.current = requestAnimationFrame(drawFrame)
    }
    drawRef.current = requestAnimationFrame(drawFrame)
  }, [])
  

  return (
    <div className="App">
      <video ref={videoEl} />
      <canvas ref={canvasEl} />
    </div>
  );
}

export default App
