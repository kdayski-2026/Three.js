import Experience from "../Experience";
import Material from "./Components/Material";
import Plane from "./Plane";
import Sphere from "./Sphere";
import Suzanne from "./Suzanne";
import Torus from "./Torus";

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
		this.torus = new Torus(this.material)
		this.sphere = new Sphere(this.material)
		this.suzanne = new Suzanne(this.material)
		this.place = new Plane(this.material)
	}

	update() {
		if (this.torus) this.torus.update()
		if (this.sphere) this.sphere.update()
		if (this.suzanne) this.suzanne.update()
		if (this.place) this.place.update()
	}
}