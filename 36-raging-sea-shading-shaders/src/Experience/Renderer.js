import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
	constructor() {
		this.experience = new Experience()

		this.canvas = this.experience.canvas
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.sizes = this.experience.sizes

		this.setInstance()
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		})
		this.instance.toneMapping = THREE.ACESFilmicToneMapping
		this.resize()
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(this.sizes.pixelRation)
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}