import * as THREE from 'three'
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      material: new THREE.MeshStandardMaterial(),
      setTextures: (textures) =>
        set((state) => {
          const material = state.material
          for (const [key, value] of Object.entries(textures)) {
            value.wrapS = value.wrapT = THREE.RepeatWrapping;
            value.repeat.set(1, 2);
            value.rotation = Math.PI / 2;
            material[key] = value
            if (key === 'map') material[key].colorSpace = THREE.LinearSRGBColorSpace
          }
          return { material };
        }),
    };
  }),
);
