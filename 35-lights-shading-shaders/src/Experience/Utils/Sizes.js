import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
	constructor() {
		super()

		this.resize()
		window.addEventListener('resize', () => this.trigger('resize'))
	}

	resize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
		this.aspect = this.width / this.height
	}
}