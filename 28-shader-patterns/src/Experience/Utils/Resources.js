import * as THREE from 'three'
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class Resources extends EventEmitter {
	constructor(sources) {
		super()

		this.sources = sources

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		this.setLoaders()
		this.setLoading()
	}

	setDracoLoader() {
		const draco = new DRACOLoader()
		draco.setDecoderPath('/draco/')
		const gltf = new GLTFLoader()
		gltf.setDRACOLoader(draco)
		this.loaders.draco = gltf
	}

	setLoaders() {
		this.loaders = {}
		this.loaders.texture = new THREE.TextureLoader()
		this.loaders.cubeTexture = new THREE.CubeTextureLoader()
		this.loaders.gltf = new GLTFLoader()
		this.setDracoLoader()
	}

	setLoading() {
		if (!this.sources.length) this.trigger('ready')
		for (const source of this.sources) {
			this.loaders[source.type].load(
				source.path,
				(file) => this.sourceLoaded(source, file)
			)
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file
		this.loaded++

		if (this.loaded === this.toLoad) {
			this.trigger('ready')
		}
	}
}