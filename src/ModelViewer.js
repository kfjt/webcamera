import React, { useRef, useEffect } from 'react'
// import '@google/model-viewer'

import { BallGlb, BallUsdz } from './assets/Ball'

const BaseModelViewer = ({ glb, usdz }) => {
  const mv = useRef(null)

  useEffect(() => {
    const modelViewer = mv.current
    const srcURL = new URL(glb, modelViewer.baseURI)
    modelViewer.ar = true
    modelViewer.cameraControls = true
    modelViewer.src = srcURL.href
    modelViewer.iosSrc = usdz
    modelViewer.quickLookBrowsers = 'safari chromea'
  }, [mv, glb, usdz])

  return (
    <model-viewer ref={mv} />
  )
}

export const BallModelViewer = () => (
  <BaseModelViewer glb={BallGlb} usdz={BallUsdz} />
)
