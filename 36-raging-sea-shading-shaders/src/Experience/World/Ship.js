import * as THREE from 'three'

import Experience from "../Experience";
import Water from './Water';

export default class Ship {
	constructor() {
		this.experience = new Experience()
		this.water = new Water()

		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time

		this.setInstance()
	}

	setInstance() {
		this.setModel()
		this.setLight()
		this.setAudio()
	}

	setAudio() {
		this.sounds = {}
		this.sounds.ocean = new Audio('sounds/ocean.mp3')

		this.sounds.ocean.loop = true
		this.sounds.ocean.volume = 0.2
		this.sounds.ocean.play()
	}

	setLight() {
		this.light = new THREE.DirectionalLight(0xffffff, 1)
		this.light.position.y = 1
		this.light.position.x = 2
		this.light.position.z = -2
		this.light.lookAt(this.model)
		this.scene.add(this.light)
	}

	setModel() {
		this.model = this.resources.items.ship.scene
		this.model.scale.setScalar(0.0015)
		this.scene.add(this.model)
	}

	waveElevation(position) {
		let elevation = Math.sin(position.x * this.water.uniforms.uBigWavesFrequency.value.x + this.time.elapsed * this.water.uniforms.uBigWavesSpeed.value) * Math.sin(position.z * this.water.uniforms.uBigWavesFrequency.value.y + this.time.elapsed * this.water.uniforms.uBigWavesSpeed.value) * this.water.uniforms.uBigWavesElevation.value;
		return elevation;
	}

	update() {
		const currentPos = this.model.position
		const elevation = this.waveElevation(currentPos)

		const offset = 0.01
		const elevationX = this.waveElevation({ x: currentPos.x + offset, y: currentPos.y, z: currentPos.z })
		const elevationZ = this.waveElevation({ x: currentPos.x, y: currentPos.y, z: currentPos.z + offset })

		const tiltX = (elevationX - elevation) / offset
		const tiltZ = (elevationZ - elevation) / offset

		this.model.position.y = elevation
		this.model.rotation.z = tiltX
		this.model.rotation.x = -tiltZ

		this.model.position.x = -this.model.position.y
		this.model.position.z = -this.model.position.y
	}
}