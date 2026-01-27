import Experience from "../Experience";
import Flag from "./Flag";

export default class World {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources

		if (this.resources.toLoad) {
			this.resources.on('ready', () => {
				this.setWorld()
			})
		} else {
			this.setWorld()
		}
	}

	setWorld() {
		this.flag = new Flag()
	}

	update() {
		if (this.flag) this.flag.update()
	}
}