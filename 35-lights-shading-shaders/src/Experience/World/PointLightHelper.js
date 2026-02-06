import * as THREE from 'three'
import Experience from '../Experience'

export default class PointLightHelper {
	constructor() {
		this.experience = new Experience()

		this.scene = this.experience.scene

		this.setInstance()
	}

	setInstance() {
		this.setGeometry()
		this.setMaterial()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new THREE.IcosahedronGeometry(0.1, 2)
	}

	setMaterial() {
		this.material = new THREE.MeshBasicMaterial({
			color: new THREE.Color(1, 0.1, 0.1),
			side: THREE.DoubleSide,
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.set(0, 2.5, 0)
		this.scene.add(this.mesh)
	}
}