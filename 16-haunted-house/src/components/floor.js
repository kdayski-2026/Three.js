import * as THREE from 'three'
import gui from '../core/gui'
import scene from '../core/scene'
import {
	floorAlphaTexture,
	floorColorTexture,
	floorARMTexture,
	floorNormalTexture,
	floorDisplacementTexture
} from '../core/textures'

/**
 * Textures
 */
floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Floor
 */
const floorParams = {
	size: 20,
	segments: 100,
	displacementScale: 0.3,
	displacementBias: -0.2,
	rotationX: - Math.PI * 0.5
}

const floor = new THREE.Mesh(
	new THREE.PlaneGeometry(
		floorParams.size,
		floorParams.size,
		floorParams.segments,
		floorParams.segments
	),
	new THREE.MeshStandardMaterial({
		transparent: true,
		alphaMap: floorAlphaTexture,
		map: floorColorTexture,
		aoMap: floorARMTexture,
		roughnessMap: floorARMTexture,
		metalnessMap: floorARMTexture,
		normalMap: floorNormalTexture,
		displacementMap: floorDisplacementTexture,
		displacementScale: floorParams.displacementScale,
		displacementBias: floorParams.displacementBias
	})
)
floor.rotation.x = floorParams.rotationX
floor.receiveShadow = true

/**
 * Debug
 */
const updateFloorGeometry = () => {
	floor.geometry.dispose()
	floor.geometry = new THREE.PlaneGeometry(
		floorParams.size,
		floorParams.size,
		floorParams.segments,
		floorParams.segments
	)
}

const updateFloorMaterial = () => {
	floor.material.displacementScale = floorParams.displacementScale
	floor.material.displacementBias = floorParams.displacementBias
}

const floorGui = gui.addFolder('Floor')
floorGui.add(floor.material, 'wireframe').name('Wireframe')
floorGui.add(floor, 'receiveShadow').name('Can receive shadow')
floorGui.add(floorParams, 'size').min(0).max(100).step(0.001).name('Size').onChange(updateFloorGeometry)
floorGui.add(floorParams, 'segments').min(10).max(1000).step(1).name('Segments').onChange(updateFloorGeometry)
floorGui.add(floorParams, 'displacementScale').min(0).max(0.5).step(0.001).name('Displacement scale').onChange(updateFloorMaterial)
floorGui.add(floorParams, 'displacementBias').min(-0.5).max(0.5).step(0.001).name('Displacement bias').onChange(updateFloorMaterial)

floorGui.open(false)

export default floor