import { useGLTF } from '@react-three/drei';
import Top from './Top';
import Bottom from './Bottom';
import { useMemo } from 'react';

export default function Laptop() {
  const computer = useGLTF('./portfolio/laptop/Low_Poly_Laptop.gltf');

  const [top, bottom] = useMemo(() => {
    computer.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const top = computer.scene.getObjectByName('Screen');
    const bottom = computer.scene.getObjectByName('Scene');
    return [top, bottom];
  }, [computer]);

  return (
    <group scale={1.5} position={[0, 3, 0]}>
      <Top top={top} />
      <Bottom bottom={bottom} />
    </group>
  );
}

useGLTF.preload('./portfolio/laptop/Low_Poly_Laptop.gltf');
