import Experience from "../Experience"

export default class Environment {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.scene = this.experience.scene

		this.setInstance()
	}

	setInstance() {
		this.instance = this.resources.items.environment
		this.scene.background = this.instance
		this.scene.environment = this.instance
	}
}