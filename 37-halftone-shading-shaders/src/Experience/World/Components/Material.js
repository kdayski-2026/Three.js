import * as THREE from 'three'

import Experience from '../../Experience'

import vertexShader from '../../../shaders/halftone/vertex.glsl'
import fragmentShader from '../../../shaders/halftone/fragment.glsl'

let instance
export default class Material {
	constructor() {
		if (instance) return instance
		instance = this

		this.experience = new Experience()

		this.sizes = this.experience.sizes
		this.debug = this.experience.debug

		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setParameters() {
		this.parameters = {}
		this.parameters.color = '#ff794d'
		this.parameters.shadowColor = '#8e19b8'
		this.parameters.lightColor = '#e5ffe0'
	}

	setUniforms() {
		this.uniforms = {}
		this.uniforms.uColor = new THREE.Uniform(new THREE.Color(this.parameters.color))
		this.uniforms.uShadeColor = new THREE.Uniform(new THREE.Color(this.parameters.shadeColor))
		this.uniforms.uResolution = new THREE.Uniform(
			new THREE.Vector2(
				this.sizes.width * this.sizes.pixelRatio,
				this.sizes.height * this.sizes.pixelRatio
			)
		)
		this.uniforms.uShadowRepetitions = new THREE.Uniform(100)
		this.uniforms.uShadowColor = new THREE.Uniform(
			new THREE.Color(this.parameters.shadowColor)
		)
		this.uniforms.uLightRepetitions = new THREE.Uniform(130)
		this.uniforms.uLightColor = new THREE.Uniform(
			new THREE.Color(this.parameters.lightColor)
		)
	}

	setInstance() {
		this.setParameters()
		this.setUniforms()
		this.instance = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: { ...this.uniforms }
		})
	}

	setDebug() {
		this.debug.ui
			.addColor(this.parameters, 'color')
			.onChange(() => {
				this.instance.uniforms.uColor.value.set(this.parameters.color)
			})
		this.debug.ui
			.add(this.instance.uniforms.uShadowRepetitions, 'value', 1, 300, 1).name('uShadowRepetitions')
		this.debug.ui
			.addColor(this.parameters, 'shadowColor')
			.onChange(() => {
				this.instance.uniforms.uShadowColor.value.set(this.parameters.shadowColor)
			})
		this.debug.ui
			.add(this.instance.uniforms.uLightRepetitions, 'value', 1, 300, 1).name('uLightRepetitions')
		this.debug.ui
			.addColor(this.parameters, 'lightColor')
			.onChange(() => {
				this.instance.uniforms.uLightColor.value.set(this.parameters.lightColor)
			})
	}

	resize() {
		this.instance.uniforms.uResolution.value.set(
			this.sizes.width * this.sizes.pixelRatio,
			this.sizes.height * this.sizes.pixelRatio
		)
	}
}