import * as THREE from 'three'
import Experience from '../Experience'
import vertexShader from '../../shaders/water/vertex.glsl'
import fragmentShader from '../../shaders/water/fragment.glsl'

export default class Water {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.debug = this.experience.debug
		this.setInstance()
		if (this.debug.active) this.setDebug()
	}

	setInstance() {
		this.setGeometry()
		this.setMaterial()
		this.setMesh()
		this.instance = this.mesh
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(2, 2, 512, 512)
	}

	setMaterial() {
		this.colors = {}
		this.colors.depth = new THREE.Color('#186691')
		this.colors.surface = new THREE.Color('#9bd8ff')
		this.material = new THREE.ShaderMaterial(
			{
				vertexShader,
				fragmentShader,
				uniforms: {
					uTime: { value: this.time.elapsed },

					uBigWavesElevation: { value: 0.2 },
					uBigWavesFrequency: { value: new THREE.Vector2(4.0, 1.5) },
					uBigWavesSpeed: { value: 0.001 },

					uSmallWavesElevation: { value: 0.15 },
					uSmallWavesFrequency: { value: 3 },
					uSmallWavesSpeed: { value: 0.0001 },
					uSmallWavesIterations: { value: 4 },

					uDepthColor: { value: this.colors.depth },
					uSurfaceColor: { value: this.colors.surface },
					uColorMultiplier: { value: 2.0 },
					uColorOffset: { value: 0.25 }
				}
			}
		)
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.rotation.x = - Math.PI * 0.5
		this.scene.add(this.mesh)
	}

	update() {
		this.mesh.material.uniforms.uTime.value = this.time.elapsed
	}

	setDebug() {
		const update = () => {
		}

		const bigWaves = this.debug.ui.addFolder('Big waves')
		const smallWaves = this.debug.ui.addFolder('Small waves')
		const color = this.debug.ui.addFolder('Color')

		bigWaves.add(this.mesh.material.uniforms.uBigWavesElevation, 'value', 0, 1, 0.001).name('elevation')
		bigWaves.add(this.mesh.material.uniforms.uBigWavesFrequency.value, 'x', 0, 10, 0.001).name('frequencyX')
		bigWaves.add(this.mesh.material.uniforms.uBigWavesFrequency.value, 'y', 0, 10, 0.001).name('frequencyY')
		bigWaves.add(this.mesh.material.uniforms.uBigWavesSpeed, 'value', 0, 0.01, 0.0001).name('speed')

		smallWaves.add(this.mesh.material.uniforms.uSmallWavesElevation, 'value', 0, 1, 0.001).name('elevation')
		smallWaves.add(this.mesh.material.uniforms.uSmallWavesFrequency, 'value', 0, 10, 0.001).name('frequency')
		smallWaves.add(this.mesh.material.uniforms.uSmallWavesSpeed, 'value', 0, 0.01, 0.0001).name('speed')
		smallWaves.add(this.mesh.material.uniforms.uSmallWavesIterations, 'value', 0, 8, 1).name('iterations')

		color.addColor(this.colors, 'depth')
			.onChange(() => this.mesh.material.uniforms.uDepthColor.value.set(this.colors.depth))
		color.addColor(this.colors, 'surface')
			.onChange(() => this.mesh.material.uniforms.uSurfaceColor.value.set(this.colors.surface))
		color.add(this.mesh.material.uniforms.uColorMultiplier, 'value', 1, 5, 0.001).name('multiplier')
		color.add(this.mesh.material.uniforms.uColorOffset, 'value', 0, 1, 0.001).name('offset')
	}
}