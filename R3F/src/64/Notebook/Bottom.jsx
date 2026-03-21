import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';

export default function Bottom({ computer }) {
  const bottom = useMemo(() => {
    const bottom = computer.scene.clone();
    const result = [];
    bottom.traverse((child) => {
      if (child.name === 'Top') {
        child.removeFromParent();
      }
      if (child.isMesh) result.push(child);
    });
    result[9].removeFromParent();
    bottom.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return bottom;
  }, [computer]);

  return (
    <>
      <primitive object={bottom} position-y={-1.2} />
    </>
  );
}

useGLTF.preload('./macbook_model.gltf');
