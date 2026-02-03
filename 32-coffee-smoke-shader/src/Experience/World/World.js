import Experience from "../Experience";
import Coffee from "./Coffee";
import Smoke from "./Smoke";

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
		this.coffee = new Coffee()
		this.smoke = new Smoke()
	}

	update() {
		if (this.smoke) this.smoke.update()
	}
}