import * as THREE from 'three'

import Experience from "../Experience"

import vertexShader from '../../shaders/smoke/vertex.glsl'
import fragmentShader from '../../shaders/smoke/fragment.glsl'

export default class Smoke {
	constructor() {
		this.experience = new Experience()

		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.sizes = this.experience.sizes
		this.camera = this.experience.camera
		this.debug = this.experience.debug

		this.setInstance()
		this.setRaycasterTrack()
		if (this.debug.active) this.setDebug()
	}

	setRaycasterTrack() {
		this.raycaster = new THREE.Raycaster()
		this.mouse = new THREE.Vector2()
		window.addEventListener('mousemove', (event) => {
			this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
		})
	}

	setInstance() {
		this.setGeometry()
		this.setUniforms()
		this.setMaterial()
		this.setMesh()
	}

	setUniforms() {
		this.uniforms = {}
		const texture = this.resources.items.perlin
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		this.uniforms.uPerlinTexture = new THREE.Uniform(texture)
		this.uniforms.uTime = new THREE.Uniform(this.time.elapsed)
		this.uniforms.uColor = new THREE.Uniform(new THREE.Color(0.6, 0.3, 0.2))
		this.uniforms.uRemapFrom = new THREE.Uniform(0.45)
		this.uniforms.uRemapTo = new THREE.Uniform(1.6)
		this.uniforms.uRotateYSpeed = new THREE.Uniform(0.005)
		this.uniforms.uTwistPower = new THREE.Uniform(10)
		this.uniforms.uWindPower = new THREE.Uniform(0.005)
		this.uniforms.uMouseUv = new THREE.Uniform(new THREE.Vector2(-1, -1))
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 16, 64)
		this.geometry.translate(0, 0.5, 0)
		this.geometry.scale(1.5, 6, 1.5)
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: { ...this.uniforms },
			side: THREE.DoubleSide,
			transparent: true,
			depthWrite: false
			// wireframe: true,
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.y = 1.83
		this.scene.add(this.mesh)
	}

	setDebug() {
		this.debug.ui.addColor(this.mesh.material.uniforms.uColor, 'value').name('smokeColor')
		this.debug.ui.add(this.mesh.material.uniforms.uRemapFrom, 'value', 0, 1, 0.001).name('uRemapFrom')
		this.debug.ui.add(this.mesh.material.uniforms.uRemapTo, 'value', 0, 10, 0.001).name('uRemapTo')
		this.debug.ui.add(this.mesh.material.uniforms.uRotateYSpeed, 'value', 0, 0.1, 0.001).name('uRotateYSpeed')
		this.debug.ui.add(this.mesh.material.uniforms.uTwistPower, 'value', 0, 20, 0.001).name('uTwistPower')
		this.debug.ui.add(this.mesh.material.uniforms.uWindPower, 'value', 0, 0.1, 0.001).name('uWindPower')
	}

	update() {
		this.mesh.material.uniforms.uTime.value = this.time.elapsed

		this.raycaster.setFromCamera(this.mouse, this.camera.instance)
		const intersects = this.raycaster.intersectObject(this.mesh)

		if (intersects.length) {
			const hit = intersects[0]
			if (hit.uv) {
				this.mesh.material.uniforms.uMouseUv.value.copy(hit.uv)
			}
		} else {
			this.mesh.material.uniforms.uMouseUv.value.set(-1, -1)
		}
	}
}