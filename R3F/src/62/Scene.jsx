import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import { Bvh } from '@react-three/drei';

export default function Scene() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Bvh>
        <Experience />
      </Bvh>
    </Canvas>
  );
}
