import Experience from "../Experience";
import Ship from "./Ship";
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
		this.ship = new Ship()
	}

	update() {
		if (this.water) this.water.update()
		if (this.ship) this.ship.update()
	}
}