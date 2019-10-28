import React, { useRef, useEffect } from 'react'
import '@google/model-viewer'

import ARglb from './gltf/AR.glb'

const ModelViewer = () => {
  const mv = useRef(null)

  useEffect(() => {
    const modelViewer = mv.current
    modelViewer.src = ARglb
  }, [mv])

  return (
    <model-viewer ar camera-controls ref={mv} />
  )
}

export default ModelViewer
