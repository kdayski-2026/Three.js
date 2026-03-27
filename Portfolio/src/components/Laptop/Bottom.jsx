import { useGLTF } from '@react-three/drei';

export default function Bottom({ bottom }) {
  return (
    <>
      <primitive object={bottom} position-y={-0.5} scale={10} />
    </>
  );
}

useGLTF.preload('./macbook_model.gltf');
