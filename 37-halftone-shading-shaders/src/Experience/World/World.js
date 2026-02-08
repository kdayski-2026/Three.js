import Experience from "../Experience";
import Suzanne from "./Suzanne";
import Material from "./Components/Material";
import TorusKnot from "./TorusKnot";
import Sphere from "./Sphere";

export default class World {
	constructor() {
		this.experience = new Experience()

		this.resources = this.experience.resources

		this.setInstance()
	}

	setInstance() {
		if (this.resources.toLoad) {
			this.resources.on('ready', () => this.setWorld())
		} else this.setWorld()
	}

	setWorld() {
		this.material = new Material()
		this.suzanne = new Suzanne()
		this.torusKnot = new TorusKnot()
		this.sphere = new Sphere()
	}

	resize() {
		if (this.material) this.material.resize()
	}

	update() {
		if (this.suzanne) this.suzanne.update()
		if (this.torusKnot) this.torusKnot.update()
		if (this.sphere) this.sphere.update()
	}
}