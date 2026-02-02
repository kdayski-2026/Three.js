import * as THREE from 'three'
import Experience from "../Experience";

import model_common from '../../shaders/model/common.glsl?raw'
import model_begin_vertex from '../../shaders/model/begin_vertex.glsl?raw'
import model_beginnormal_vertex from '../../shaders/model/beginnormal_vertex.glsl?raw'

import shadow_common from '../../shaders/shadow/common.glsl?raw'
import shadow_begin_vertex from '../../shaders/shadow/begin_vertex.glsl?raw'

export default class Model {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.debug = this.experience.debug

		this.setInstance()
		if (this.debug.active) {
			this.setDebug()
		}
	}

	setInstance() {
		this.setTextures()
		this.setUniforms()
		this.setMaterial()
		this.setDepthMaterial()
		this.setMesh()
	}

	setTextures() {
		this.mapTexture = this.resources.items.color
		this.mapTexture.colorSpace = THREE.SRGBColorSpace
		this.normalTexture = this.resources.items.normal
	}

	setUniforms() {
		this.uniforms = {
			uTime: { value: 0 },
			uSpinPower: { value: 4 },
			uStretchPower: { value: 0.9 }
		}
	}

	setMaterial() {
		this.material = new THREE.MeshStandardMaterial({
			map: this.mapTexture,
			normalMap: this.normalTexture
		})

		this.material.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = this.uniforms.uTime
			shader.uniforms.uSpinPower = this.uniforms.uSpinPower
			shader.uniforms.uStretchPower = this.uniforms.uStretchPower

			shader.vertexShader = shader.vertexShader.replace(
				'#include <common>', model_common
			)
			shader.vertexShader = shader.vertexShader.replace(
				'#include <beginnormal_vertex>', model_beginnormal_vertex
			)
			shader.vertexShader = shader.vertexShader.replace(
				'#include <begin_vertex>', model_begin_vertex
			)
		}
	}

	setDepthMaterial() {
		this.depthMaterial = new THREE.MeshDepthMaterial({
			depthPacking: THREE.RGBADepthPacking
		})

		this.depthMaterial.onBeforeCompile = (shader) => {
			shader.uniforms.uTime = this.uniforms.uTime
			shader.uniforms.uSpinPower = this.uniforms.uSpinPower
			shader.uniforms.uStretchPower = this.uniforms.uStretchPower

			shader.vertexShader = shader.vertexShader.replace(
				'#include <common>', shadow_common
			)
			shader.vertexShader = shader.vertexShader.replace(
				'#include <begin_vertex>', shadow_begin_vertex
			)
		}
	}

	setMesh() {
		this.mesh = this.resources.items.gltf.scene.children[0]
		this.mesh.rotation.y = Math.PI * 0.5
		this.mesh.material = this.material
		this.mesh.customDepthMaterial = this.depthMaterial
		this.scene.add(this.mesh)

		this.updateAllMaterials()
	}

	updateAllMaterials() {
		this.scene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
				child.material.envMapIntensity = 1
				child.material.needsUpdate = true
				child.castShadow = true
				child.receiveShadow = true
			}
		})
	}

	setDebug() {
		this.debug.ui.add(this.uniforms.uSpinPower, 'value', 0, 10, 0.001).name('uSpinPower')
		this.debug.ui.add(this.uniforms.uStretchPower, 'value', 0, 10, 0.001).name('uStretchPower')
	}

	update() {
		if (this.uniforms?.uTime) this.uniforms.uTime.value = this.time.elapsed
	}
}