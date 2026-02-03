import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
	constructor() {
		super()

		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio)

		window.addEventListener('resize', () => this.trigger('resize'))
	}

	resize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.pixelRatio = Math.min(window.devicePixelRatio)
	}
}