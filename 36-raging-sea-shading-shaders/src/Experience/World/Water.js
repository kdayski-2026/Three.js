import * as THREE from 'three'
import Experience from '../Experience'

import vertexShader from '../../shaders/water/vertex.glsl'
import fragmentShader from '../../shaders/water/fragment.glsl'

let instance
export default class Water {
	constructor() {
		if (instance) return instance
		instance = this

		this.experience = new Experience()

		this.scene = this.experience.scene
		this.time = this.experience.time
		this.debug = this.experience.debug

		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setInstance() {
		this.setGeometry()
		this.setParameters()
		this.setUniforms()
		this.setMaterial()
		this.setMesh()
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(2, 2, 512, 512)
		this.geometry.deleteAttribute('normal')
		this.geometry.deleteAttribute('uv')
	}

	setParameters() {
		this.parameters = {}
		this.parameters.depthColor = '#ff4000'
		this.parameters.surfaceColor = '#151c37'
	}

	setUniforms() {
		this.uniforms = {}

		this.uniforms.uTime = { value: 0 }

		this.uniforms.uBigWavesElevation = { value: 0.2 }
		this.uniforms.uBigWavesFrequency = { value: new THREE.Vector2(4, 1.5) }
		this.uniforms.uBigWavesSpeed = { value: 0.75 }

		this.uniforms.uSmallWavesElevation = { value: 0.15 }
		this.uniforms.uSmallWavesFrequency = { value: 3 }
		this.uniforms.uSmallWavesSpeed = { value: 0.2 }
		this.uniforms.uSmallIterations = { value: 4 }

		this.uniforms.uDepthColor = { value: new THREE.Color(this.parameters.depthColor) }
		this.uniforms.uSurfaceColor = { value: new THREE.Color(this.parameters.surfaceColor) }
		this.uniforms.uColorOffset = { value: 0.925 }
		this.uniforms.uColorMultiplier = { value: 1 }
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: { ...this.uniforms }
		})
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.rotation.x = - Math.PI * 0.5
		this.scene.add(this.mesh)
	}

	setDebug() {
		this.debug.ui.addColor(this.parameters, 'depthColor').onChange(() => { this.mesh.material.uniforms.uDepthColor.value.set(this.parameters.depthColor) })
		this.debug.ui.addColor(this.parameters, 'surfaceColor').onChange(() => { this.mesh.material.uniforms.uSurfaceColor.value.set(this.parameters.surfaceColor) })

		this.debug.ui.add(this.mesh.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
		this.debug.ui.add(this.mesh.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
		this.debug.ui.add(this.mesh.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
		this.debug.ui.add(this.mesh.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

		this.debug.ui.add(this.mesh.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
		this.debug.ui.add(this.mesh.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
		this.debug.ui.add(this.mesh.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
		this.debug.ui.add(this.mesh.material.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

		this.debug.ui.add(this.mesh.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
		this.debug.ui.add(this.mesh.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
	}

	update() {
		this.mesh.material.uniforms.uTime.value = this.time.elapsed
	}
}