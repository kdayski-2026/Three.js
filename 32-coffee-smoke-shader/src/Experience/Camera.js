import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from "./Experience";

export default class Camera {
	constructor() {
		this.experience = new Experience()

		this.sizes = this.experience.sizes
		this.canvas = this.experience.canvas
		this.scene = this.experience.scene

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			25,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.x = 8
		this.instance.position.y = 10
		this.instance.position.z = 12
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.target.y = 3
		this.controls.enableDamping = true
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()
	}
}