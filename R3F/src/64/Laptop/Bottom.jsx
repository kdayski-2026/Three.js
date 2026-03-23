import { useGLTF } from '@react-three/drei';

export default function Bottom({ bottom }) {
  return (
    <>
      <primitive object={bottom} position-y={-1.2} />
    </>
  );
}

useGLTF.preload('./macbook_model.gltf');
