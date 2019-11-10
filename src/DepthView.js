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
// https://github.com/intel/depth-camera-web-demo/blob/master/depthdemo.html
export const DepthWebgl = props => {
  const { videoDepth } = props
  const depthWebgl = useRef()
  const frameAvailable = useRef(false)
  const readBuffer = useRef(null)
  const readFormat = useRef(null)

  useEffect(() => {
    const video = videoDepth.current
    const canvas = depthWebgl.current

    const configureGLContext = () => {
      const ctx = canvas.getContext('webgl2')
      ctx.color_buffer_float_ext = ctx.getExtension('EXT_color_buffer_float')

      ctx.enable(ctx.BLEND);
      ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
      // Shaders and program are needed only if rendering depth texture.
      var vertex_shader = ctx.createShader(ctx.VERTEX_SHADER);
      ctx.shaderSource(vertex_shader, `
        attribute vec2 v;
        varying vec2 t;
        void main(){
          gl_Position = vec4(v.x * 2.0 - 1.0, 1.0 - v.y * 2.0, 0, 1);
          t = v;
        }`);
      ctx.compileShader(vertex_shader);
      var pixel_shader = ctx.createShader(ctx.FRAGMENT_SHADER);
      ctx.shaderSource(pixel_shader, `
        precision mediump float;
        uniform sampler2D s;
        varying vec2 t;
        void main(){
          vec4 tex = texture2D(s, t) * vec4(10.0, 10.0, 10.0, 1.0);
          gl_FragColor = tex.rrra;
        }`);
      ctx.compileShader(pixel_shader);
      var program = ctx.createProgram();
      ctx.attachShader(program, vertex_shader);
      ctx.attachShader(program, pixel_shader);
      ctx.linkProgram(program);
      ctx.useProgram(program);
      var vertex_location = ctx.getAttribLocation(program, "v");
      ctx.enableVertexAttribArray(vertex_location);
      ctx.uniform1i(ctx.getUniformLocation(program, "s"), 0);
      var vertex_buffer = ctx.createBuffer();
      ctx.bindBuffer(ctx.ARRAY_BUFFER, vertex_buffer);
      ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), ctx.STATIC_DRAW);
      var index_buffer = ctx.createBuffer();
      ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, index_buffer);
      ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), ctx.STATIC_DRAW);
      var depth_texture = ctx.createTexture();
      ctx.bindTexture(ctx.TEXTURE_2D, depth_texture);
      ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
      ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
      ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.NEAREST);
      ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
      // Framebuffer for reading back the texture.
      var framebuffer = ctx.createFramebuffer();
      ctx.bindFramebuffer(ctx.FRAMEBUFFER, framebuffer);
      ctx.framebufferTexture2D(ctx.FRAMEBUFFER, ctx.COLOR_ATTACHMENT0, ctx.TEXTURE_2D, depth_texture, 0);
      ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
      ctx.vertex_buffer = vertex_buffer;
      ctx.vertex_location = vertex_location;
      ctx.index_buffer = index_buffer;
      ctx.depth_texture = depth_texture;
      ctx.framebuffer = framebuffer;

      return ctx
    }

    const gl = configureGLContext()

    const readPixels = () => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, gl.framebuffer)
      if (!readBuffer.current) {
        readFormat.current = gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT)
        if (readFormat.current === gl.RED && gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE) === gl.FLOAT) {
          readBuffer.current = new Float32Array(video.width * video.height)
        } else {
          readFormat.current = gl.RGBA
          readBuffer.current = new Float32Array(video.width * video.height * 4)
        }
      }
      gl.readPixels(0, 0, video.width, video.height, readFormat.current, gl.FLOAT, readBuffer.current)
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    const putReadPixelsTo2DCanvas = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const stride = (readFormat.current === ctx.RED) ? 1 : 4
      for (let i = 0, j = 0; i < data.length; i += 4, j += stride) {
        data[i] = readBuffer.current[j] * 255
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
    }

    const drawFrame = () => {
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, gl.depth_texture)

      if (frameAvailable.current) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.R32F, gl.RED, gl.FLOAT, video)
        readPixels()
        putReadPixelsTo2DCanvas()
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertex_buffer);
      gl.vertexAttribPointer(gl.vertex_location, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.index_buffer);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

      requestAnimationFrame(drawFrame)
    }

    video.addEventListener('canplay', () => { frameAvailable.current = true })
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    })
    video.addEventListener('loadeddata', drawFrame)
  }, [videoDepth])


  return (<canvas className="DepthWebgl" ref={depthWebgl} />)
}
