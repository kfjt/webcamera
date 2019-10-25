import React from 'react';
// import 'aframe';
import { Scene, Entity, Box, Sphere, Cylinder, Plane, Text } from 'react-aframe-ar';

const ARScene = props => {
  const { position } = props

  return (
    <div className="ARScene" style={position}>
      <Scene embedded arjs>
        <Entity geometry={{primitive: 'box', width: 5}} position="0 0 -5"/>
        {/* <Sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow /> */}
        {/* <Cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow /> */}
        {/* <Plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow /> */}
        {/* <Sky color="#ECECEC" /> */}
        {/* <Text value="Hello world, react-aframe-ar!" align="center" position="0 2.3 -1.5" color="#7BC8A4" /> */}
        {/* <Box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" shadow /> */}
        <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
        <a-marker-camera preset='hiro'></a-marker-camera>
        {/* <Entity camera /> */}
      </Scene>
    </div>
  )
}

export default ARScene;
