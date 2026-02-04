import * as THREE from 'three'

import Experience from "./Experience";

export default class Renderer {
	constructor() {
		this.experience = new Experience()
		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug

		this.rendererParameters = {}
		this.rendererParameters.clearColor = '#1d1f2a'

		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		})
		this.instance.setClearColor(this.rendererParameters.clearColor)
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(this.sizes.pixelRatio)
	}

	setDebug() {
		this.debug.ui.addColor(this.rendererParameters, 'clearColor').onChange(() => this.instance.setClearColor(this.rendererParameters.clearColor))
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(this.sizes.pixelRatio)
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}