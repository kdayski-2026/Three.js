import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from './Experience'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.sizes = this.experience.sizes
		this.canvas = this.experience.canvas

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(0.25, - 0.25, 1)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
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