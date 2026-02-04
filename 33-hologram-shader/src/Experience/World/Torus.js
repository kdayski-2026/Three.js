import * as THREE from 'three'

import Experience from "../Experience";

export default class Torus {
	constructor(material) {
		this.experience = new Experience()
		this.material = material
		this.scene = this.experience.scene
		this.time = this.experience.time

		this.setInstance()
	}

	setInstance() {
		this.setGeometry()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32)
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material.instance)
		this.mesh.position.x = 3
		this.scene.add(this.mesh)
	}

	update() {
		this.mesh.rotation.x = - this.time.elapsed * 0.1
		this.mesh.rotation.y = this.time.elapsed * 0.2
		this.material.update()
	}
}