import React from 'react';
// import { Entity, Scene } from 'aframe-react';

const ARScene = props => {
  const { position, geolocation } = props
  const locations = []
  locations.push({ latitude: 35.689487, longitude: 139.691706 })
  locations.push(geolocation)
  const box = locations.map((value, index) => <a-box color="yellow" gps-entity-place={value} key={index} />)

  return (
    <div className="ARScene" style={position}>
      <a-scene gps-camera-debug embedded vr-mode-ui="enabled: false" arjs='sourceType: webcam; debugUIEnabled: false;'>
        {/* <a-box color="yellow" gps-entity-place="latitude: 35.689487; longitude: 139.691706"/> */}
        {box}
        <a-camera gps-camera rotation-reader></a-camera>
      </a-scene>
    </div>
  )
}

export default ARScene;
