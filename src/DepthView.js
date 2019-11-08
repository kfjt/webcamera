import React, { useRef, useEffect } from 'react'

export const DepthHeatmap = props => {
  const { videoDepth } = props
  const depthHeatmap = useRef()

  useEffect(() => {
    const video = videoDepth.current
    const canvas = depthHeatmap.current

    const color = data => {
      for (let index = 0; index < data.length; index += 4) {
        const x = 128 < data[index] ? 255 : data[index] + 128
        data[index] = 0
        data[index + 1] = 0
        data[index + 2] = 255 - x
      }
    }

    const drawFrame = () => {
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
  }, [videoDepth])


  return (<canvas className="DepthHeatmap" ref={depthHeatmap} />)
}

// https://github.com/intel/depth-camera-web-demo
// https://01.org/zh/node/5101
export const DepthWebgl = props => {
  const { videoDepth } = props
  const depthWebgl = useRef()
  const video_frame_available = useRef(false)

  useEffect(() => {
    const video = videoDepth.current
    const canvas = depthWebgl.current

    const gl = canvas.getContext('webgl2')
    gl.color_buffer_float_ext = gl.getExtension('EXT_color_buffer_float')
    const depth_texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, depth_texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)

    const framebuffer = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, depth_texture, 0)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    video.addEventListener('oncanplay', () => { video_frame_available.current = true })

    const drawFrame = () => {
      // FIXME: video
      if (gl.color_buffer_float_ext) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, gl.RED, gl.FLOAT, video);
      } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, gl.RGBA, gl.FLOAT, video);
      }
      requestAnimationFrame(drawFrame)
    }

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    })
    video.addEventListener('loadeddata', drawFrame)
  }, [videoDepth])


  return (<canvas className="DepthWebgl" ref={depthWebgl} />)
}
