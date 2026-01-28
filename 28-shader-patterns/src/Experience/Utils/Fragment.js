const shaderPatterns = import.meta.glob('../../shaders/test/patterns/pattern*.glsl', { query: '?raw', import: 'default', eager: true })

export default class Fragment {
	constructor() {
		this.setNames()
		this.sort()
		this.setActive()
	}

	setNames() {
		this.patterns = Object.fromEntries(
			Object.entries(shaderPatterns).map(([path, content]) => {
				const fileName = path.split('/').pop();
				const readableName = fileName
					.replace('.glsl', '')
					.replace('pattern', 'Pattern ')
					.trim();

				return [readableName, content];
			})
		);
	}

	sort() {
		this.patterns = Object.fromEntries(
			Object.entries(this.patterns).sort(([keyA], [keyB]) => new Intl.Collator(undefined, { numeric: true }).compare(keyB, keyA))
		);
	}

	setActive(index = 0) {
		this.active = this.patterns[Object.keys(this.patterns)[index]]
	}
}