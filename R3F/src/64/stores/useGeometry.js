import * as THREE from 'three'
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
  subscribeWithSelector((set) => {
    return {
      box: new THREE.BoxGeometry(),
      plane: new THREE.PlaneGeometry(),
      circle: new THREE.CircleGeometry()
    };
  }),
);
