import * as THREE from 'three'

import Experience from "../Experience";

export default class Suzanne {
	constructor(material) {
		this.experience = new Experience()
		this.material = material
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		this.setInstance()
	}

	setInstance() {
		this.setModel()
	}

	setModel() {
		this.mesh = this.resources.items.suzanne.scene
		this.mesh.traverse((child) => {
			if (child.isMesh) child.material = this.material.instance
		})
		this.scene.add(this.mesh)
	}

	update() {
		this.mesh.rotation.x = - this.time.elapsed * 0.1
		this.mesh.rotation.y = this.time.elapsed * 0.2
		this.material.update()
	}
}