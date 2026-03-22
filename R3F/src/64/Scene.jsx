import './style.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience';
import useCamera from './stores/useCamera';

export default function Scene() {
  const position = useCamera((state) => state.position);

  return (
    <Canvas
      shadows
      className="r3f"
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position,
      }}
    >
      <Experience />
    </Canvas>
  );
}
