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
        far: 2000,
        position: [0, 2, 4],
        // position: [-0.5, 0.5, 1.5],
      }}
    >
      <Experience />
    </Canvas>
  );
}
