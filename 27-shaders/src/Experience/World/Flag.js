import * as THREE from 'three'
import Experience from "../Experience";

import vertexShader from '../../shaders/test/vertex.glsl'
import fragmentShader from '../../shaders/test/fragment.glsl'

export default class Flag {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.recourses = this.experience.resources
		this.debug = this.experience.debug

		this.setFlag()
	}

	setFlag() {
		this.setGeometry()
		this.setMaterial()
		this.setMesh()

		this.setWaves()
		this.setAnimation()
		this.setTexture()

		this.setDebug()
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
	}

	setMaterial() {
		this.material = new THREE.RawShaderMaterial({
			vertexShader,
			fragmentShader
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.scale.y = 2 / 3
		this.scene.add(this.mesh)
	}

	setWaves() {
		this.material.uniforms.uFrequency = { value: new THREE.Vector2(10, 5) }
	}

	setAnimation() {
		this.animation = {}
		this.animation.speed = 0.001
		this.material.uniforms.uTime = { value: 0 }
	}

	setTexture() {
		this.material.uniforms.uTexture = { value: this.recourses.items.flag }
	}

	setDebug() {
		if (this.debug.active) {
			this.debug.ui.add(this.material.uniforms.uFrequency.value, 'x', 0, 20, 0.01)
				.name('frequencyX')
			this.debug.ui.add(this.material.uniforms.uFrequency.value, 'y', 0, 20, 0.01)
				.name('frequencyY')
			this.debug.ui.add(this.animation, 'speed', 0, 0.01, 0.001)
		}
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed * this.animation.speed
	}
}