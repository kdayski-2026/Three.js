import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from "./Experience";

export default class Camera {
	constructor() {
		this.experience = new Experience()

		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			25,
			this.sizes.aspect,
			0.1,
			100
		)
		this.instance.position.setScalar(7)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
	}

	resize() {
		this.instance.aspect = this.sizes.aspect
		this.instance.updateProjectionMatrix()
	}

	update() {
		this.controls.update()
	}
}