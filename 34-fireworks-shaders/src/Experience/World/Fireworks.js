import * as THREE from 'three'
import gsap from 'gsap'

import Experience from '../Experience'

import vertexShader from '../../shaders/fireworks/vertex.glsl'
import fragmentShader from '../../shaders/fireworks/fragment.glsl'

export default class Fireworks {
	constructor(
		count,
		position,
		size,
		texture,
		radius,
		color
	) {
		this.count = count
		this.position = position
		this.size = size
		this.texture = texture
		this.radius = radius
		this.color = color

		this.experience = new Experience()
		this.sizes = this.experience.sizes

		this.scene = this.experience.scene
		this.time = this.experience.time
		this.resources = this.experience.resources

		this.setInstance()
	}

	setInstance() {
		this.setGeometry()
		this.setUniforms()
		this.setMaterial()
		this.setPoints()
	}

	setUniforms() {
		this.uniforms = {}
		this.uniforms.uTime = new THREE.Uniform(
			this.time.elapsed
		)
		this.uniforms.uTexture = new THREE.Uniform(
			this.texture
		)
		this.uniforms.uSize = new THREE.Uniform(
			this.size
		)
		this.uniforms.uResolution = new THREE.Uniform(
			this.sizes.resolution
		)
		this.uniforms.uColor = new THREE.Uniform(
			this.color
		)
		this.uniforms.uProgress = new THREE.Uniform(
			0
		)
	}

	setGeometry() {
		const positions = new Float32Array(this.count * 3)
		const sizes = new Float32Array(this.count)
		const timeMultipliers = new Float32Array(this.count)

		for (let i = 0; i < this.count; i++) {
			const i3 = i * 3

			const spherical = new THREE.Spherical(
				this.radius * (0.75 + Math.random() * 0.25),
				Math.random() * Math.PI,
				Math.random() * Math.PI * 2
			)
			const position = new THREE.Vector3()
			position.setFromSpherical(spherical)

			positions[i3 + 0] = position.x
			positions[i3 + 1] = position.y
			positions[i3 + 2] = position.z

			sizes[i] = Math.random()

			timeMultipliers[i] = 1 + Math.random()
		}

		this.geometry = new THREE.BufferGeometry()
		this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
		this.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1))
		this.geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliers, 1))
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: { ...this.uniforms },
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		})
	}

	setPoints() {
		this.points = new THREE.Points(this.geometry, this.material)
		this.points.position.copy(this.position)
		this.scene.add(this.points)

		// Animate
		gsap.to(
			this.points.material.uniforms.uProgress,
			{
				value: 1,
				duration: 3,
				ease: 'linear',
				onComplete: () => this.destroy()
			}
		)
	}

	resize() {
		this.points.material.uniforms.uResolution.value = this.sizes.resolution
	}

	update() {
		this.points.material.uniforms.uTime.value = this.time.elapsed
	}

	destroy() {
		this.scene.remove(this.points)
		this.geometry.dispose()
		this.material.dispose()
	}
}