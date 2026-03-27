import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
	subscribeWithSelector((set) => {
		return {
			ambient: true,
			directional: true,
			rectArea: true,
			spot: true,
			toggle: (light) =>
				set((state) => {
					return { [light]: !state[light] };
				}),
		};
	}),
);
