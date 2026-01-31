import Experience from "../Experience/Experience"
import Galaxy from './Galaxy'

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
		this.galaxy = new Galaxy()
	}

	update() {
		if (this.galaxy) this.galaxy.update()
	}
}