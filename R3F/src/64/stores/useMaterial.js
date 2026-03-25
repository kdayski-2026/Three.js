import * as THREE from 'three'
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
	subscribeWithSelector((set) => {
		return {
			basic: new THREE.MeshBasicMaterial(),
			standard: new THREE.MeshStandardMaterial(),
			shader: new THREE.ShaderMaterial()
		};
	}),
);
