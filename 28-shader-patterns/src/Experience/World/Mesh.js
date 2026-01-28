import * as THREE from 'three'

import Experience from '../Experience'
import Fragment from '../Utils/Fragment'

import testVertexShader from '../../shaders/test/vertex.glsl'

export default class Mesh {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.fragment = new Fragment()

		this.setInstance()
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
			this.material.needsUpdate = true
		}

		this.debug.ui.add(debugObject, 'fragment', this.fragment.patterns).onChange(update)
	}

	update() {

	}
}