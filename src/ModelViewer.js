import React, { useRef, useEffect } from 'react'
// import '@google/model-viewer'

import { BallGlb, BallUsdz } from './assets/Ball'

const ModelViewer = () => {
  const mv = useRef(null)

  useEffect(() => {
    const modelViewer = mv.current
    modelViewer.ar = true
    modelViewer.cameraControls = true
    modelViewer.src = BallGlb
    modelViewer.iosSrc = BallUsdz
    modelViewer.quickLookBrowsers = 'safari chromea'
  }, [mv])

  return (
    <model-viewer ref={mv} />
  )
}

export default ModelViewer
