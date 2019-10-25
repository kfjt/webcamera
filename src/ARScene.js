import React from 'react';
import { Entity, Scene } from 'aframe-react';

const ARScene = props => {
  const { position } = props

  return (
    <div className="ARScene" style={position}>
      <Scene embedded arjs='sourceType: webcam;'>
        <Entity primitive='a-marker' preset='hiro'>
          <Entity geometry={{ primitive: 'box' }} material={{ color: 'red' }} position={{ x: 0, y: 0, z: 0 }} />
        </Entity>
        <Entity camera></Entity>
      </Scene>
    </div>
  )
}

export default ARScene;
