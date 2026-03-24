import { Color, MeshStandardMaterial } from 'three';
import { useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect } from 'react';

export default function Lamp() {
  const lamp = useGLTF('./portfolio/lights/uploads_files_5932906_retro_desk_lamp.glb');
  const { position, rotation } = useControls('Lamp', {
    position: {
      value: { x: -4.8, y: 2.1, z: -2.0 },
    },
    rotation: {
      value: Math.PI * 1.25,
      min: 0,
      max: Math.PI * 2,
    },
  });

  useEffect(() => {
    lamp.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: new Color('#1b1b1b'),
          roughness: 0,
          metalness: 0,
        });
        child.receiveShadow = true;
        child.castShadow = true;
      }
    });
  }, []);

  return (
    <primitive
      scale={0.12}
      rotation-y={rotation}
      object={lamp.scene}
      position={[position.x, position.y, position.z]}
    />
  );
}

useGLTF.preload('./portfolio/lights/uploads_files_5932906_retro_desk_lamp.glb');
