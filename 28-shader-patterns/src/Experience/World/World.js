import Experience from "../Experience";
import Mesh from './Mesh'

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
		this.mesh = new Mesh()
	}

	update() {
		if (this.mesh) this.mesh.update()
	}
}