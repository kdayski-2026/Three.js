import * as THREE from 'three'
import { Sky } from 'three/addons/objects/Sky.js'

import Experience from "../Experience";

export default class Environment {
	constructor() {
		this.experience = new Experience()

		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.renderer = this.experience.renderer
		this.camera = this.experience.camera

		this.parameters = {
			turbidity: 10,
			rayleigh: 3,
			mieCoefficient: 0.005,
			mieDirectionalG: 0.7,
			elevation: -2.2,
			azimuth: 180,
			exposure: this.renderer.instance.toneMappingExposure
		}

		this.setInstance()
		this.setUniforms()
		if (this.debug.active) this.setDebug()
	}

	setInstance() {
		this.sky = new Sky()
		this.sky.scale.setScalar(45000)
		this.scene.add(this.sky)
		this.sun = new THREE.Vector3();
	}

	setUniforms() {
		const uniforms = this.sky.material.uniforms;
		uniforms['turbidity'].value = this.parameters.turbidity;
		uniforms['rayleigh'].value = this.parameters.rayleigh;
		uniforms['mieCoefficient'].value = this.parameters.mieCoefficient;
		uniforms['mieDirectionalG'].value = this.parameters.mieDirectionalG;

		const phi = THREE.MathUtils.degToRad(90 - this.parameters.elevation);
		const theta = THREE.MathUtils.degToRad(this.parameters.azimuth);

		this.sun.setFromSphericalCoords(1, phi, theta);

		uniforms['sunPosition'].value.copy(this.sun);

		this.renderer.instance.toneMappingExposure = this.parameters.exposure;
		this.renderer.instance.render(this.scene, this.camera.instance);
	}

	setDebug() {
		this.debug.ui.add(this.parameters, 'turbidity', 0.0, 20.0, 0.1).onChange(() => this.setUniforms());
		this.debug.ui.add(this.parameters, 'rayleigh', 0.0, 4, 0.001).onChange(() => this.setUniforms());
		this.debug.ui.add(this.parameters, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(() => this.setUniforms());
		this.debug.ui.add(this.parameters, 'mieDirectionalG', 0.0, 1, 0.001).onChange(() => this.setUniforms());
		this.debug.ui.add(this.parameters, 'elevation', -3, 10, 0.01).onChange(() => this.setUniforms());
		this.debug.ui.add(this.parameters, 'azimuth', - 180, 180, 0.1).onChange(() => this.setUniforms());
		this.debug.ui.add(this.parameters, 'exposure', 0, 1, 0.0001).onChange(() => this.setUniforms());
	}
}