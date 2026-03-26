import { DirectionalLightHelper } from 'three';
import { useHelper } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { useRef } from 'react';

export default function Directional() {
  const directionalLightRef = useRef();
  const { position, color, intensity } = useControls('Lights', {
    Directional: folder({
      color: '#6c78a3',
      position: {
        value: { x: 16, y: 12, z: -4.99 },
      },
      target: {
        value: {
          x: -9,
          y: -15,
        },
        joystick: 'invertY',
      },
      targetZ: {
        value: 10,
      },
      intensity: {
        value: 1.5,
        min: 0,
        max: 10,
      },
    }),
  });
  // useHelper(directionalLightRef, DirectionalLightHelper, 1);

  return (
    <directionalLight
      ref={directionalLightRef}
      position={[position.x, position.y, position.z]}
      color={color}
      intensity={intensity}
      castShadow={false}
    />
  );
}
