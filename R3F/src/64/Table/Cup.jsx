import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function Cup() {
  const teaRef = useRef();
  const model = useGLTF('/portfolio/tea/tea_set_01_1k.gltf');
  //   const texture = useTexture('/portfolio/tea/perlin.png');

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

  const { roughness, metalness, opacity } = useControls('Tea', {
    roughness: {
      value: 0,
      min: 0,
      max: 1,
    },
    metalness: {
      value: 1,
      min: 0,
      max: 1,
    },
    opacity: {
      value: 0.8,
      min: 0,
      max: 1,
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
    <group position={[0, -0.45, 0]}>
      <primitive object={cup} scale={scale} rotation-y={rotation} />
      <mesh rotation-x={Math.PI * -0.5} position={[0.15, 0.17, 0.06]}>
        <circleGeometry args={[0.14, 16]} />
        <meshStandardMaterial
          ref={teaRef}
          color="#4C1208"
          transparent={true}
          roughness={roughness}
          metalness={metalness}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/portfolio/tea/tea_set_01_1k.gltf');
