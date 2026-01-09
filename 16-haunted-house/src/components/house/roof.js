import * as THREE from 'three'
import gui from '../../core/gui'
import {
	roofColorTexture,
	roofARMTexture,
	roofNormalTexture
} from '../../core/textures'

roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofColorTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

// Roof
const roofParams = {
	radius: 3.5,
	height: 1.5,
	radialSegments: 4,
	positionY: 2.5 + 0.75,
	rotationY: Math.PI * 0.25

}

const roof = new THREE.Mesh(
	new THREE.ConeGeometry(
		roofParams.radius,
		roofParams.height,
		roofParams.radialSegments
	),
	new THREE.MeshStandardMaterial({
		map: roofColorTexture,
		aoMap: roofARMTexture,
		metalnessMap: roofARMTexture,
		roughnessMap: roofARMTexture,
		normalMap: roofNormalTexture
	})
)
roof.position.y = roofParams.positionY
roof.rotation.y = roofParams.rotationY
roof.castShadow = true

// Debug
const roofGui = gui.addFolder('Roof')
roofGui.add(roof.material, 'wireframe').name('Wireframe')
roofGui.add(roof, 'castShadow').name('Can receive shadow')

export default roof