import * as THREE from 'three'
import Experience from "../Experience/Experience"

import vertexShader from '../shaders/galaxy/vertex.glsl'
import fragmentShader from '../shaders/galaxy/fragment.glsl'

export default class Galaxy {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.sizes = this.experience.sizes
		this.time = this.experience.time
		this.debug = this.experience.debug

		this.setParameters()
		this.generateGalaxy()

		if (this.debug.active) {
			this.setDebug()
		}
	}

	setParameters() {
		this.parameters = {}
		this.parameters.count = 200000
		this.parameters.size = 0.005
		this.parameters.radius = 5
		this.parameters.branches = 3
		this.parameters.spin = 1
		this.parameters.randomness = 0.5
		this.parameters.randomnessPower = 3
		this.parameters.insideColor = '#ff6030'
		this.parameters.outsideColor = '#1b3984'

		this.uniforms = {}
		this.uniforms.uSize = { value: 30 * this.sizes.pixelRatio }
		this.uniforms.uTime = { value: this.time.elapsed }
		this.uniforms.uSpeed = { value: 0.044 }
	}

	generateGalaxy() {
		this.destroy()
		this.setInstance()
	}

	setInstance() {
		this.setGeometry()
		this.setMaterial()
		this.setPoints()
	}

	setGeometry() {
		this.geometry = new THREE.BufferGeometry()

		const positions = new Float32Array(this.parameters.count * 3)
		const colors = new Float32Array(this.parameters.count * 3)
		const scales = new Float32Array(this.parameters.count * 1)
		const randomness = new Float32Array(this.parameters.count, 3)

		const insideColor = new THREE.Color(this.parameters.insideColor)
		const outsideColor = new THREE.Color(this.parameters.outsideColor)

		for (let i = 0; i < this.parameters.count; i++) {
			const i3 = i * 3

			// Position
			const radius = Math.random() * this.parameters.radius

			const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

			positions[i3 + 0] = Math.cos(branchAngle) * radius
			positions[i3 + 1] = 0
			positions[i3 + 2] = Math.sin(branchAngle) * radius

			const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
			const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
			const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

			randomness[i3 + 0] = randomX
			randomness[i3 + 1] = randomY
			randomness[i3 + 2] = randomZ

			// Color
			const mixedColor = insideColor.clone()
			mixedColor.lerp(outsideColor, radius / this.parameters.radius)

			colors[i3 + 0] = mixedColor.r
			colors[i3 + 1] = mixedColor.g
			colors[i3 + 2] = mixedColor.b

			// Scale
			scales[i] = Math.random()
		}

		this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
		this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
		this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true,
			vertexShader,
			fragmentShader,
			uniforms: { ...this.uniforms }
		})
	}

	setPoints() {
		this.points = new THREE.Points(this.geometry, this.material)
		this.scene.add(this.points)
	}

	destroy() {
		if (this.points) {
			this.geometry.dispose()
			this.material.dispose()
			this.scene.remove(this.points)
		}
	}

	update() {
		this.points.material.uniforms.uTime.value = this.time.elapsed
	}

	setDebug() {
		this.debug.ui.add(this.parameters, 'count').min(100).max(1000000).step(100).onFinishChange(() => this.generateGalaxy())
		this.debug.ui.add(this.parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(() => this.generateGalaxy())
		this.debug.ui.add(this.parameters, 'branches').min(2).max(20).step(1).onFinishChange(() => this.generateGalaxy())
		this.debug.ui.add(this.parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(() => this.generateGalaxy())
		this.debug.ui.add(this.parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(() => this.generateGalaxy())
		this.debug.ui.addColor(this.parameters, 'insideColor').onFinishChange(() => this.generateGalaxy())
		this.debug.ui.addColor(this.parameters, 'outsideColor').onFinishChange(() => this.generateGalaxy())
		this.debug.ui.add(this.uniforms.uSize, 'value').min(1).max(30).step(1).onChange(() => this.generateGalaxy()).name('uSize')
		this.debug.ui.add(this.uniforms.uSpeed, 'value').min(0).max(10).step(0.001).onFinishChange(() => this.generateGalaxy()).name('uSpeed')
	}
}