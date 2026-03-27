import { useHelper } from '@react-three/drei';
import { folder, useControls } from 'leva';
import { useRef } from 'react';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default function RectArea() {
  const rectAreaRef = useRef();
  const { intensity, height, width, color, position } = useControls('Lights', {
    RectArea: folder({
      position: {
        value: {
          x: 12,
          y: 9,
        },
        joystick: 'invertY',
      },
      intensity: {
        value: 35,
        min: 0,
        max: 100,
      },
      width: {
        value: 5.4,
        min: 0,
        max: 10,
      },
      height: {
        value: 4,
        min: 0,
        max: 10,
      },
      color: '#4126b1',
    }),
  });
  // useHelper(rectAreaRef, RectAreaLightHelper, 1);

  return (
    <rectAreaLight
      ref={rectAreaRef}
      width={width}
      height={height}
      intensity={intensity}
      color={color}
      rotation={[0, Math.PI, 0]}
      position={[position.x, position.y, -4.99]}
    />
  );
}
