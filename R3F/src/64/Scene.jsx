import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';

export default function Scene() {
  return (
    <Canvas
      className="r3f"
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-1, 1, 1],
      }}
    >
      <Experience />
    </Canvas>
  );
}
