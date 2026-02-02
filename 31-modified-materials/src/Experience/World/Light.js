import * as THREE from 'three'
import Experience from "../Experience";

export default class Light {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene

		this.setInstance()
	}

	setInstance() {
		this.instance = new THREE.DirectionalLight('#ffffff', 3)
		this.instance.castShadow = true
		this.instance.shadow.mapSize.set(1024, 1024)
		this.instance.shadow.camera.far = 15
		this.instance.shadow.normalBias = 0.05
		this.instance.position.set(0.25, 2, - 2.25)
		this.scene.add(this.instance)
	}
}