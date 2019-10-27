import React from 'react';
// import { Entity, Scene } from 'aframe-react';

const ARScene = props => {
  const { position } = props

  return (
    <div className="ARScene" style={position}>
      {/* <Scene embedded arjs='sourceType: webcam;'> */}
        {/* <Entity primitive='a-marker' preset='hiro'> */}
          {/* <Entity geometry={{ primitive: 'box' }} material={{ color: 'red' }} position={{ x: 0, y: 0, z: 0 }} /> */}
        {/* </Entity> */}
        {/* <Entity camera></Entity> */}
      {/* </Scene> */}
      <a-scene gps-camera-debug embedded vr-mode-ui="enabled: false" arjs='sourceType: webcam; debugUIEnabled: false;'>
        <a-box color="yellow" gps-entity-place="latitude: 35.689487; longitude: 139.691706"/>
        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
    </div>
  )
}

export default ARScene;
