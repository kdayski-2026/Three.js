import * as THREE from 'three'

import Experience from '../Experience'
import Fireworks from './Fireworks'
import Environment from './Environment'

export default class World {
	constructor() {
		this.experience = new Experience()

		this.resources = this.experience.resources

		this.setInstance()
	}

	setInstance() {
		if (this.resources.toLoad) {
			this.resources.on('ready', () => this.setWorld())
		} else this.setWorld()
	}

	setWorld() {
		this.environment = new Environment()
		window.addEventListener('click', () => this.createRandomFirework())
	}

	createRandomFirework() {
		const count = Math.round(400 + Math.random() * 1000)
		const position = new THREE.Vector3(
			(Math.random() - 0.5) * 2,
			Math.random(),
			(Math.random() - 0.5) * 2
		)
		const size = 0.1 + Math.random() * 0.1
		const items = Object.keys(this.resources.items).length
		const texture = this.resources.items[`particle${Math.ceil(Math.random() * items)}`]
		texture.flipY = false
		const radius = 0.5 + Math.random()
		const color = new THREE.Color()
		color.setHSL(Math.random(), 1, 0.7)

		this.createFirework(
			count,
			position,
			size,
			texture,
			radius,
			color
		)
	}

	createFirework(
		count,
		position,
		size,
		texture,
		radius,
		color
	) {
		this.fireworks = new Fireworks(
			count,
			position,
			size,
			texture,
			radius,
			color
		)
	}

	resize() {
		if (this.fireworks) this.fireworks.resize()
	}

	update() {
		if (this.fireworks) this.fireworks.update()
	}
}