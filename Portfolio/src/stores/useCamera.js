import * as THREE from 'three'
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
	subscribeWithSelector((set) => {
		return {
			cameraMove: true,
			position: new THREE.Vector3(0, 4, 6),
			setCameraMove: (cameraMove) =>
				set((state) => {
					return { cameraMove };
				}),
		};
	}),
);
