import React, {useRef, useEffect} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs'
import './App.css'

function App() {
  const videoEl = useRef(null)
  const canvasEl = useRef(null)

  useEffect(() => {
    const video = videoEl.current
    const canvas = canvasEl.current

    const drawKeypoints = (keypoints, ctx) => {
      keypoints.forEach(({score, part, position}) => {
        const {x, y} = position
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
      })
    }

    const drawFrame = async () => {
      const net = await posenet.load({})

      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)

      const tensor = tf.browser.fromPixels(canvas)
      const pose = await net.estimateMultiplePoses(tensor, {
        flipHorizontal: false,
        maxDetections: 5,
        scoreThreshold: 0.6,
        nmsRadius: 20})

      pose
        .filter(({score}) => 0.5 < score)
        .forEach(({keypoints}) => {
          drawKeypoints(keypoints, ctx)
        })

      requestAnimationFrame(drawFrame)
    }

    const setVideoStream = async () => {
      const { mediaDevices } = navigator
      if (mediaDevices && video !== null) {
        video.style.display = 'none'
        video.srcObject = await mediaDevices.getUserMedia({video: true})
        video.onloadedmetadata = () => {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
        }
        video.onloadeddata = () => drawFrame()
        video.play()
      }
    }
    setVideoStream()
  }, [])
  

  return (
    <div className="App">
      <video ref={videoEl} />
      <canvas ref={canvasEl} />
    </div>
  );
}

export default App
