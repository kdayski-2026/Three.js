import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export default create(
	subscribeWithSelector((set) => {
		return {
			glitch: false,
			toggleGlitch: () =>
				set((state) => {
					return { glitch: !state.glitch };
				}),
		};
	}),
);
