import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useMemo, useRef } from 'react';
import Tea from './Tea';

export default function Cup() {
  const model = useGLTF('/portfolio/tea/tea_set_01_1k.gltf');

  const { position, scale, rotation } = useControls('Cup', {
    position: {
      value: { x: 1.35, z: -0.55 },
      step: 0.01,
      joystick: 'invertY',
    },
    scale: {
      value: 3,
      step: 0.01,
      min: 0,
      max: 5,
    },
    rotation: {
      value: 3.84,
      step: 0.01,
      min: 0,
      max: Math.PI * 2,
    },
  });

  const cup = useMemo(() => {
    let found = null;
    model.scene.traverse((child) => {
      if (child.name === 'tea_set_01_cup_small_01') {
        found = child;
      }
    });

    return found ? found.clone(true) : null;
  }, [model]);

  if (!cup) return null;

  return (
    <group position={[position.x, -0.45, position.z]}>
      <primitive object={cup} scale={scale} rotation-y={rotation} />
      <Tea />
    </group>
  );
}

useGLTF.preload('/portfolio/tea/tea_set_01_1k.gltf');
