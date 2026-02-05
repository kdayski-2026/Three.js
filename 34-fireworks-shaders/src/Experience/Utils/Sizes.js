import * as THREE from 'three'

import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
	constructor() {
		super()

		this.resize()
		window.addEventListener('resize', () => this.trigger('resize'))
	}

	resize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.aspect = this.width / this.height
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
		this.resolution = new THREE.Vector2(this.width * this.pixelRatio, this.height * this.pixelRatio)
	}
}