import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { useControls } from 'leva';

export default function Scene() {
  const { shadows } = useControls('Shadows', {
    shadows: false,
  });

  return (
    <Canvas
      shadows={shadows}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Experience />
    </Canvas>
  );
}
