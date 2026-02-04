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
			new Audio('/sounds/error-glitch.mp3'),
			new Audio('/sounds/VGT - Digital TV - 12.mp3'),
			new Audio('/sounds/VGT - Digital TV Elements - 1.mp3'),
			new Audio('/sounds/VGT - Flash - 7.mp3'),
			new Audio('/sounds/VGT - Noise - 5.mp3'),
			new Audio('/sounds/virtual_vibes-glitch-sound-effect-hd-379466.mp3')
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

	update() {
		this.instance.uniforms.uTime.value = this.time.elapsed

		const glitchTime = this.time.elapsed
		let glitchStrength = Math.sin(glitchTime) + Math.sin(glitchTime * 3.45) + Math.sin(glitchTime * 8.76)
		glitchStrength /= 3.0

		glitchStrength = Math.max(0, Math.min(1, (glitchStrength - 0.3) / (1.0 - 0.3)))

		const currentTime = this.time.elapsed
		if (
			currentTime - this.lastSoundTime > this.soundCooldown
		) {
			this.playGlitchSound(glitchStrength)
			this.lastSoundTime = currentTime
		}
		this.lastGlitchStrength = glitchStrength
	}

	playGlitchSound(glitchStrength) {
		this.sound = this.sounds[Math.floor(Math.random() * this.sounds.length)]
		this.sound.currentTime = 0
		this.sound.volume = Math.min(glitchStrength, 0.1)
		this.sound.play()
	}
}