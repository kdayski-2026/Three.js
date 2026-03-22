import * as THREE from 'three'
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
	subscribeWithSelector((set) => {
		return {
			position: new THREE.Vector3(0, 5, 14),
		};
	}),
);
