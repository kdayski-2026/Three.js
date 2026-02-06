import Experience from '../Experience'
import Material from './Components/Material'

import Torus from './Torus'
import Sphere from './Sphere'
import Suzanne from './Suzanne'
import DirectionalLightHelper from './DirectionalLightHelper'
import PointLightHelper from './PointLightHelper'

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
		// Basic
		new Material()

		// Objects
		this.torus = new Torus()
		this.sphere = new Sphere()
		this.suzanne = new Suzanne()

		// Helpers
		new DirectionalLightHelper()
		new PointLightHelper()
	}

	update() {
		if (this.torus) this.torus.update()
		if (this.sphere) this.sphere.update()
		if (this.suzanne) this.suzanne.update()
	}
}