import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import EventEmitter from "./EventEmitter";

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

	setLoaders() {
		this.loaders = {}
		this.loaders.texture = new THREE.TextureLoader()
		this.loaders.cubeTexture = new THREE.CubeTextureLoader()
		const draco = new DRACOLoader()
		draco.setDecoderPath('/draco/')
		const gltf = new GLTFLoader()
		gltf.setDRACOLoader(draco)
		this.loaders.draco = gltf
		this.loaders.gltf = gltf
	}

	setLoading() {
		if (!this.toLoad) this.trigger('ready')
		for (const source of this.sources) {
			this.loaders[source.type].load(source.path, (file) => this.sourceLoaded(source, file))
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file
		this.loaded++

		if (this.loaded === this.toLoad) this.trigger('ready')
	}
}