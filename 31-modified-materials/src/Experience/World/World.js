import Experience from "../Experience";
import Environment from "./Environment";
import Light from "./Light";
import Model from "./Model";
import Plane from "./Plane";

export default class World {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources

		this.setInstance()
	}

	setInstance() {
		if (this.resources.toLoad) {
			this.resources.on('ready', () => {
				this.setWorld()
			})
		} else {
			this.setWorld()
		}
	}

	setWorld() {
		this.environment = new Environment()
		this.light = new Light()
		this.model = new Model()
		this.plane = new Plane()
	}

	update() {
		if (this.model) this.model.update()
	}
}