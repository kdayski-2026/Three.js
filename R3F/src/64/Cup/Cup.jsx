import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import Tea from './Tea';

export default function Cup() {
  const model = useGLTF('/portfolio/tea/uploads_files_6535368_Seramik_ini_kupa.glb');

  const { position, scale, rotation } = useControls('Cup', {
    position: {
      value: { x: 1.35, z: -0.55 },
      step: 0.01,
      joystick: 'invertY',
    },
    scale: {
      value: 0.15,
      min: 0,
      max: 1,
    },
    rotation: {
      value: 5.48,
      min: 0,
      max: Math.PI * 2,
    },
  });

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.receiveShadow = true;
      child.castShadow = true;
    }
  });

  return (
    <group position={[position.x, -0.45, position.z]}>
      <primitive object={model.scene} scale={scale} rotation-y={rotation} />
      <Tea />
    </group>
  );
}

useGLTF.preload('/portfolio/tea/uploads_files_6535368_Seramik_ini_kupa.gltf');
