import * as THREE from 'three'

import Experience from '../Experience'
import Fragment from '../Utils/Fragment'

import testVertexShader from '../../shaders/test/vertex.glsl'

export default class Mesh {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.debug = this.experience.debug
		this.fragment = new Fragment()

		this.setInstance()
		this.setAnimation()
		if (this.debug.active) {
			this.setDebug()
		}
	}

	setInstance() {
		this.setGeometry()
		this.setMaterial()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader: testVertexShader,
			fragmentShader: this.fragment.active,
			side: THREE.DoubleSide
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.mesh)
	}

	setAnimation() {
		this.animation = {}
		this.animation.speed = 0.0025
		this.material.uniforms.uTime = { value: 0.0 }
		this.material.uniforms.uFrequency = { value: new THREE.Vector2(25, 12.5) }
	}

	setDebug() {
		const debugObject = {}
		debugObject.fragment = this.fragment.active

		const update = () => {
			this.material.dispose()
			this.material = new THREE.ShaderMaterial({
				vertexShader: testVertexShader,
				fragmentShader: debugObject.fragment,
				side: THREE.DoubleSide
			})
			this.mesh.material = this.material
			this.mesh.material.uniforms.uTime = { value: 0.0 }
			this.mesh.material.uniforms.uFrequency = { value: new THREE.Vector2(25, 12.5) }
			this.material.needsUpdate = true
		}

		this.debug.ui.add(debugObject, 'fragment', this.fragment.patterns).onChange(update)
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed * this.animation.speed
	}
}