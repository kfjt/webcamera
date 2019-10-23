import React, { useRef, useEffect } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs'

const Keypoints = props => {
  const { videoEl } = props
  const canvasEl = useRef(null)

  useEffect(() => {
    const video = videoEl.current
    const canvas = canvasEl.current

    const drawFrame = async () => {
      const model = await posenet.load({})

      const ctx = canvas.getContext('2d')

      const tensor = tf.browser.fromPixels(video)
      const pose = await model.estimateMultiplePoses(tensor, {
        flipHorizontal: false,
        maxDetections: 5,
        scoreThreshold: 0.6,
        nmsRadius: 20
      })
      tensor.dispose()
      model.dispose()

      const pose_filtered = pose.filter(({ score }) => 0.5 < score)
      console.log(pose_filtered)

      if (pose_filtered.length) ctx.clearRect(0, 0, canvas.width, canvas.height)
      pose_filtered.forEach(({ keypoints }) => drawKeypoints(keypoints, ctx))
      pose_filtered.forEach(({ keypoints }) => drawAnonymous(keypoints, ctx))

      requestAnimationFrame(drawFrame)
    }

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    })
    video.addEventListener('loadeddata', drawFrame)
  }, [videoEl])


  return (<canvas className="Keypoints" ref={canvasEl} style={props.style} />)
}


const drawKeypoints = (keypoints, ctx) => {
  keypoints.forEach(({ score, part, position }) => {
    const { x, y } = position
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI)
    ctx.fillStyle = 'red'
    ctx.fill()
  })
}

const drawAnonymous = (keypoints, ctx) => {
  const eyesEars = keypoints.filter(({ part }) => ['leftEye', 'rightEye', 'leftEar', 'rightEar'].includes(part))
  const xs = eyesEars.map(({ position }) => position.x)
  const ys = eyesEars.map(({ position }) => position.y)
  const xmax = Math.max(...xs)
  const xmin = Math.min(...xs)
  const ymax = Math.max(...ys)
  const ymin = Math.min(...ys)
  ctx.beginPath()
  ctx.moveTo(xmax, ymax)
  ctx.lineTo(xmax, ymin)
  ctx.lineTo(xmin, ymin)
  ctx.lineTo(xmin, ymax)
  ctx.fillStyle = 'black'
  ctx.fill()

}

export default Keypoints
