import Experience from "../Experience";

import Material from './Components/Material';

export default class Suzanne {
	constructor() {
		this.experience = new Experience()
		this.material = new Material().instance

		this.time = this.experience.time
		this.resources = this.experience.resources
		this.scene = this.experience.scene

		this.setInstance()
	}

	setInstance() {
		this.setModel()
	}

	setModel() {
		this.model = this.resources.items.suzanne.scene

		this.model.traverse((child) => {
			if (child.isMesh) child.material = this.material
		})

		this.scene.add(this.model)
	}

	update() {
		this.model.rotation.x = - this.time.elapsed * 0.1
		this.model.rotation.y = this.time.elapsed * 0.2
	}
}