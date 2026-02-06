
import * as THREE from 'three'

import Experience from '../../Experience'

import vertexShader from '../../../shaders/shading/vertex.glsl'
import fragmentShader from '../../../shaders/shading/fragment.glsl'

let instance
export default class Material {
	constructor() {
		if (instance) return instance
		instance = this

		this.experience = new Experience()
		this.debug = this.experience.debug

		this.parameters = {}
		this.parameters.color = '#ffffff'
		this.parameters.ambientColor = '#ffffff'
		this.parameters.ambientIntensity = 0.1
		this.parameters.directionalColor = new THREE.Color(0.1, 0.1, 1.0)
		this.parameters.directionalIntensity = 3
		this.parameters.directionalSpeculaPower = 20
		this.parameters.pointColor = new THREE.Color(1.0, 0.1, 0.1)
		this.parameters.pointIntensity = 3
		this.parameters.pointSpeculaPower = 20
		this.parameters.lightDecay = 0.25

		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setInstance() {
		this.setUniforms()
		this.setMaterial()
	}

	setMaterial() {
		this.instance = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: { ...this.uniforms }
		})
	}

	setUniforms() {
		this.uniforms = {}
		this.uniforms.uColor = new THREE.Uniform(new THREE.Color(this.parameters.color))
		this.uniforms.uAmbientColor = new THREE.Uniform(new THREE.Color(this.parameters.ambientColor))
		this.uniforms.uAmbientIntensity = new THREE.Uniform(this.parameters.ambientIntensity)
		this.uniforms.uDirectionalColor = new THREE.Uniform(new THREE.Color(this.parameters.directionalColor))
		this.uniforms.uDirectionalIntensity = new THREE.Uniform(this.parameters.directionalIntensity)
		this.uniforms.uDirectionalSpeculaPower = new THREE.Uniform(this.parameters.directionalSpeculaPower)
		this.uniforms.uPointColor = new THREE.Uniform(new THREE.Color(this.parameters.pointColor))
		this.uniforms.uPointIntensity = new THREE.Uniform(this.parameters.pointIntensity)
		this.uniforms.uPointSpeculaPower = new THREE.Uniform(this.parameters.pointSpeculaPower)
		this.uniforms.uLightDecay = new THREE.Uniform(this.parameters.lightDecay)
	}

	setDebug() {
		const material = this.debug.ui.addFolder('Material')
		material.addColor(this.parameters, 'color').onChange(() => {
			this.instance.uniforms.uColor.value.set(this.parameters.color)
		})

		const ambient = this.debug.ui.addFolder('Ambient light')
		ambient.addColor(this.parameters, 'ambientColor').onChange(() => {
			this.instance.uniforms.uAmbientColor.value.set(this.parameters.ambientColor)
		}).name('color')
		ambient.add(this.parameters, 'ambientIntensity', 0, 10, 0.001).onChange(() => {
			this.instance.uniforms.uAmbientIntensity.value = this.parameters.ambientIntensity
		}).name('intensity')

		const directional = this.debug.ui.addFolder('Directional light')
		directional.addColor(this.parameters, 'directionalColor').onChange(() => {
			this.instance.uniforms.uDirectionalColor.value.set(this.parameters.directionalColor)
		}).name('color')
		directional.add(this.parameters, 'directionalIntensity', 0, 10, 0.001).onChange(() => {
			this.instance.uniforms.uDirectionalIntensity.value = this.parameters.directionalIntensity
		}).name('intensity')
		directional.add(this.parameters, 'directionalSpeculaPower', 1, 100, 1).onChange(() => {
			this.instance.uniforms.uDirectionalSpeculaPower.value = this.parameters.directionalSpeculaPower
		}).name('specularPower')

		const point = this.debug.ui.addFolder('Point light')
		point.addColor(this.parameters, 'pointColor').onChange(() => {
			this.instance.uniforms.uPointColor.value.set(this.parameters.pointColor)
		}).name('color')
		point.add(this.parameters, 'pointIntensity', 0, 10, 0.001).onChange(() => {
			this.instance.uniforms.uPointIntensity.value = this.parameters.pointIntensity
		}).name('intensity')
		point.add(this.parameters, 'pointSpeculaPower', 1, 100, 1).onChange(() => {
			this.instance.uniforms.uPointSpeculaPower.value = this.parameters.pointSpeculaPower
		}).name('specularPower')
		point.add(this.parameters, 'lightDecay', 0, 1, 0.001).onChange(() => {
			this.instance.uniforms.uLightDecay.value = this.parameters.lightDecay
		})

	}
}