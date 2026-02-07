import Experience from "../Experience";
import Water from "./Water";

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
		this.water = new Water()
	}

	update() {
		if (this.water) this.water.update()
	}
}