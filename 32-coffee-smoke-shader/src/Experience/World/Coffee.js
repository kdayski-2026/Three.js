import Experience from "../Experience";

export default class Coffee {
	constructor() {
		this.experience = new Experience()

		this.resources = this.experience.resources
		this.scene = this.experience.scene

		this.setInstance()
	}

	setInstance() {
		this.setModel()
	}

	setModel() {
		this.model = this.resources.items.bakedModel
		this.model.scene.getObjectByName('baked').material.map.anisotropy = 8
		this.scene.add(this.model.scene)
	}
}