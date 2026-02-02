import * as THREE from 'three'
import Experience from '../Experience'

export default class Plane {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setInstance()
	}

	setInstance() {
		this.setGeometry()
		this.setMaterial()
		this.setMeth()
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(15, 15, 15)
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial()
	}

	setMeth() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)

		this.mesh.rotation.y = Math.PI
		this.mesh.position.z = 6
		this.mesh.position.y = -5
		this.mesh.receiveShadow = true

		this.scene.add(this.mesh)
	}
}