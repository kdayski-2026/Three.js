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
		this.sounds = [
			new Audio('/sounds/VGT - Noise - 5.mp3'),
			new Audio('/sounds/VGT - Flash - 7.mp3'),
			new Audio('/sounds/VGT - Digital TV - 12.mp3'),
			new Audio('/sounds/VGT - Digital TV Elements - 1.mp3'),
		]

		this.sounds.forEach(sound => {
			sound.preload = 'auto'
			sound.load()
		})

		this.autoplay = new Audio('/sounds/space.mp3')
		this.autoplay.preload = 'auto'
		this.autoplay.load()
		this.autoplay.play()
		this.autoplay.volume = 0.025
		this.autoplay.loop = true

		this.lastGlitchStrength = 0
		this.soundCooldown = 0.1
		this.lastSoundTime = 0

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

	getGlitchStrengthAtY(time, y) {
		let glitchTime = time * 0.5 - y

		let glitchStrength = Math.sin(glitchTime) + Math.sin(glitchTime * 3.45) + Math.sin(glitchTime * 8.76)
		glitchStrength /= 3.0

		glitchStrength = THREE.MathUtils.smoothstep(glitchStrength, 0.3, 1.0)

		glitchStrength *= 0.25

		return glitchStrength
	}

	update() {
		const time = this.time.elapsed
		this.instance.uniforms.uTime.value = time

		const sampleYs = [-1.0, 0.0, 1.0]

		const strengths = sampleYs.map(y => this.getGlitchStrengthAtY(time, y))
		const glitchStrength = Math.max(...strengths)

		const currentTime = time
		if (currentTime - this.lastSoundTime > this.soundCooldown) {
			this.playGlitchSound(glitchStrength)
			this.lastSoundTime = currentTime
		}

		if (glitchStrength <= 0.001 && this.sound && !this.sound.paused) {
			this.sound.pause()
			this.sound.currentTime = 0
			this.sound = null
		}

		this.lastGlitchStrength = glitchStrength
	}

	playGlitchSound(glitchStrength) {
		if (glitchStrength <= 0) {
			return
		}
		this.sound = this.sounds[0]
		if (glitchStrength > 0.10) this.sound = this.sounds[1]
		if (glitchStrength > 0.15) this.sound = this.sounds[2]
		if (glitchStrength > 0.20) this.sound = this.sounds[3]

		this.sound.volume = Math.min(glitchStrength * 2.0, 0.1)
		this.sound.play()
	}
}