import * as THREE from 'three'
import Experience from './Experience'

export default class Renderer {
	constructor() {
		this.experience = new Experience()

		this.canvas = this.experience.canvas
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.debug = this.experience.debug

		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setParameters() {
		this.parameters = {}
		this.parameters.clearColor = '#26132f'
	}

	setInstance() {
		this.setParameters()
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		})
		this.instance.setClearColor(this.parameters.clearColor)
		this.resize()
	}

	setDebug() {
		this.debug.ui
			.addColor(this.parameters, 'clearColor')
			.onChange(() => {
				this.instance.setClearColor(this.parameters.clearColor)
			})
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height)
		this.instance.setPixelRatio(this.sizes.pixelRatio)
	}

	update() {
		this.instance.render(this.scene, this.camera.instance)
	}
}