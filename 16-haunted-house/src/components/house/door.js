import * as THREE from 'three'
import gui from '../../core/gui'
import {
	doorColorTexture,
	doorAlphaTexture,
	doorAmbientOcclusionTexture,
	doorMetalnessTexture,
	doorNormalTexture,
	doorRoughnessTexture,
	doorHeightTexture,
} from '../../core/textures'

doorColorTexture.colorSpace = THREE.SRGBColorSpace

// Container
const container = new THREE.Group()

// Door
const doorParams = {
	size: 2.2,
	segments: 100,
	displacementScale: 0.15,
	displacementBias: -0.04,
	positionY: 1,
	positionZ: 2.01
}

const door = new THREE.Mesh(
	new THREE.PlaneGeometry(
		doorParams.size,
		doorParams.size,
		doorParams.segments,
		doorParams.segments
	),
	new THREE.MeshStandardMaterial({
		map: doorColorTexture,
		transparent: true,
		alphaMap: doorAlphaTexture,
		aoMap: doorAmbientOcclusionTexture,
		metalnessMap: doorMetalnessTexture,
		normalMap: doorNormalTexture,
		roughnessMap: doorRoughnessTexture,
		displacementMap: doorHeightTexture,
		displacementScale: doorParams.displacementScale,
		displacementBias: doorParams.displacementBias
	})
)
door.position.y = doorParams.positionY
door.position.z = doorParams.positionZ
container.add(door)

// Door light
const lightParams = {
	color: '#ff7d46',
	intensity: 10,
	distance: 3.5,
	angle: Math.PI * 0.25,
	penumbra: 0.25,
	decay: 1,
	positionX: 0,
	positionY: 2.5,
	positionZ: 2.25
}

const doorLight = new THREE.SpotLight(
	lightParams.color,
	lightParams.intensity,
	lightParams.distance,
	lightParams.angle,
	lightParams.penumbra,
	lightParams.decay,
)

doorLight.position.set(
	lightParams.positionX,
	lightParams.positionY,
	lightParams.positionZ
)
doorLight.target.position.x = lightParams.positionX
doorLight.target.position.y = 0
doorLight.target.position.z = lightParams.positionZ

container.add(doorLight.target)
container.add(doorLight)

// Debug
const doorGui = gui.addFolder('Door')
doorGui.add(door.material, 'wireframe').name('Wireframe')
doorGui.add(door.position, 'x').min(-1.4).max(1.4).step(0.001).name('Position X')
doorGui.addColor(doorLight, 'color').name('Light color')
doorGui.add(doorLight, 'intensity').min(0).max(10).step(0.001).name('Light intensity')
doorGui.add(doorLight, 'distance').min(0).max(10).step(0.001).name('Light distance')
doorGui.add(doorLight, 'angle').min(0).max(10).step(0.001).name('Light angle')
doorGui.add(doorLight, 'penumbra').min(0).max(10).step(0.001).name('Light penumbra')
doorGui.add(doorLight, 'decay').min(0).max(10).step(0.001).name('Light decay')
doorGui.add(doorLight.position, 'x').min(-3).max(3).step(0.001).name('Position X')
doorGui.add(doorLight.position, 'y').min(-3).max(3).step(0.001).name('Position Y')
doorGui.add(doorLight.position, 'z').min(-3).max(3).step(0.001).name('Position Z')
doorGui.add(doorLight.target.position, 'x').min(-3).max(3).step(0.001).name('Target position X')
doorGui.add(doorLight.target.position, 'y').min(-3).max(3).step(0.001).name('Target position Y')
doorGui.add(doorLight.target.position, 'z').min(-3).max(3).step(0.001).name('Target position Z')

doorGui.open(false)

export default container