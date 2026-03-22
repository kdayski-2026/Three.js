import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function Scene() {
  return (
    <Canvas
      shadows
      className="r3f"
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 8, 12],
        // position: [-0.5, 0.5, 1.5],
      }}
    >
      <Experience />
    </Canvas>
  );
}
