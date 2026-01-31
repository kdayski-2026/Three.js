import * as THREE from 'three'
import Experience from "../Experience/Experience"

export default class Galaxy {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
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

		const insideColor = new THREE.Color(this.parameters.insideColor)
		const outsideColor = new THREE.Color(this.parameters.outsideColor)

		for (let i = 0; i < this.parameters.count; i++) {
			const i3 = i * 3

			// Position
			const radius = Math.random() * this.parameters.radius

			const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

			const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
			const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
			const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

			positions[i3] = Math.cos(branchAngle) * radius + randomX
			positions[i3 + 1] = randomY
			positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

			// Color
			const mixedColor = insideColor.clone()
			mixedColor.lerp(outsideColor, radius / this.parameters.radius)

			colors[i3] = mixedColor.r
			colors[i3 + 1] = mixedColor.g
			colors[i3 + 2] = mixedColor.b
		}

		this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
	}

	setMaterial() {
		this.material = new THREE.PointsMaterial({
			size: this.parameters.size,
			sizeAttenuation: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true
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

	}

	setDebug() {
		this.debug.ui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(this.generateGalaxy)
		this.debug.ui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(this.generateGalaxy)
		this.debug.ui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(this.generateGalaxy)
		this.debug.ui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(this.generateGalaxy)
		this.debug.ui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(this.generateGalaxy)
		this.debug.ui.addColor(parameters, 'insideColor').onFinishChange(this.generateGalaxy)
		this.debug.ui.addColor(parameters, 'outsideColor').onFinishChange(this.generateGalaxy)
	}
}