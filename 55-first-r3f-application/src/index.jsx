import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Experience from './Experience';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const cameraSettings = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [3, 2, 6],
};

const canvasSettings = {
  antialias: true,
  toneMapping: THREE.ACESFilmicToneMapping,
  outputColorSpace: THREE.SRGBColorSpace,
};

root.render(
  <Canvas dpr={[1, 2]} gl={canvasSettings} camera={cameraSettings}>
    <Experience />
  </Canvas>,
);
