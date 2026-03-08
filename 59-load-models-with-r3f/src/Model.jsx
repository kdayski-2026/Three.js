import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export default function Model() {
  const model = useLoader(GLTFLoader, './hamburger.glb', (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath('./draco/');
    loader.setDRACOLoader(draco);
  });

  return <primitive object={model.scene} scale={0.35} />;
}
