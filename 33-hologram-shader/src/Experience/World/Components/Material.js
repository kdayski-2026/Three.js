import * as THREE from 'three'

import vertexShader from '../../../shaders/holographic/vertex.glsl'
import fragmentShader from '../../../shaders/holographic/fragment.glsl'
import Experience from '../../Experience'

export default class Material {
	constructor() {
		this.experience = new Experience()
		this.time = this.experience.time
		this.debug = this.experience.debug

		this.materialParameters = {}
		this.materialParameters.color = '#70c1ff'

		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setInstance() {
		this.setUniforms()
		this.setMaterial()
	}

	setUniforms() {
		this.uniforms = {}
		this.uniforms.uTime = new THREE.Uniform(this.time.elapsed)
		this.uniforms.uColor = new THREE.Uniform(new THREE.Color(this.materialParameters.color))
	}

	setMaterial() {
		this.instance = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader,
			fragmentShader,
			transparent: true,
			side: THREE.DoubleSide,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		})
	}

	setDebug() {
		this.debug.ui.addColor(this.materialParameters, 'color').name('color').onChange(() => this.uniforms.uColor.value.set(this.materialParameters.color))
	}

	update() {
		this.instance.uniforms.uTime.value = this.time.elapsed
	}
}