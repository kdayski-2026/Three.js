import * as THREE from 'three'
import gui from '../../core/gui'
import {
	wallColorTexture,
	wallARMTexture,
	wallNormalTexture
} from '../../core/textures'

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Walls
const wallsParams = {
	width: 4,
	height: 2.5,
	depth: 4,
	positionY: 2.5 / 2
}

const walls = new THREE.Mesh(
	new THREE.BoxGeometry(
		wallsParams.width,
		wallsParams.height,
		wallsParams.depth
	),
	new THREE.MeshStandardMaterial({
		map: wallColorTexture,
		aoMap: wallARMTexture,
		roughnessMap: wallARMTexture,
		metalnessMap: wallARMTexture,
		normalMap: wallNormalTexture
	})
)
walls.position.y = wallsParams.positionY
walls.castShadow = true
walls.receiveShadow = true

// Debug
const wallsGui = gui.addFolder('Walls')
wallsGui.add(walls.material, 'wireframe').name('Wireframe')
wallsGui.add(walls, 'receiveShadow').name('Can receive shadow')
wallsGui.add(walls, 'castShadow').name('Can cast shadow')

export default walls