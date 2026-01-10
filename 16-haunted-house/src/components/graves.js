import * as THREE from 'three'
import gui from '../core/gui'
import {
	graveColorTexture,
	graveARMTexture,
	graveNormalTexture
} from '../core/textures'

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

/**
 * Graves
 */
const graveParams = {
	width: 0.6,
	height: 0.8,
	depth: 0.2,
	rotationX: 0.4,
	rotationY: 0.4,
	rotationZ: 0.4,
}

const graveGeometry = new THREE.BoxGeometry(
	graveParams.width,
	graveParams.height,
	graveParams.depth
)
const graveMaterial = new THREE.MeshStandardMaterial({
	map: graveColorTexture,
	aoMap: graveARMTexture,
	roughnessMap: graveARMTexture,
	metalnessMap: graveARMTexture,
	normalMap: graveNormalTexture
})

const graves = new THREE.Group()

for (let i = 0; i < 30; i++) {
	const angle = Math.random() * Math.PI * 2
	const radius = 3 + Math.random() * 4
	const x = Math.sin(angle) * radius
	const z = Math.cos(angle) * radius

	// Mesh
	const grave = new THREE.Mesh(graveGeometry, graveMaterial)
	grave.position.y = Math.random() * 0.4
	grave.position.x = x
	grave.position.z = z
	grave.rotation.x = (Math.random() - 0.5) * graveParams.rotationX
	grave.rotation.y = (Math.random() - 0.5) * graveParams.rotationY
	grave.rotation.z = (Math.random() - 0.5) * graveParams.rotationZ
	grave.castShadow = true
	grave.receiveShadow = true
	graves.add(grave)
}

// Debug
const update = () => {
	graves.children.forEach((grave) => {
		grave.geometry.dispose()
		grave.geometry = new THREE.BoxGeometry(
			graveParams.width,
			graveParams.height,
			graveParams.depth
		)
		grave.rotation.x = (Math.random() - 0.5) * graveParams.rotationX
		grave.rotation.y = (Math.random() - 0.5) * graveParams.rotationY
		grave.rotation.z = (Math.random() - 0.5) * graveParams.rotationZ
	})
}

const graveGui = gui.addFolder('Graves')
graveGui.add(graveMaterial, 'wireframe').name('Wireframe')
graveGui.add(graveParams, 'rotationX').name('Max rotation X').min(0).max(1).step(0.001).onFinishChange(update)
graveGui.add(graveParams, 'rotationY').name('Max rotation Y').min(0).max(1).step(0.001).onFinishChange(update)
graveGui.add(graveParams, 'rotationZ').name('Max rotation Z').min(0).max(1).step(0.001).onFinishChange(update)
graveGui.add(graveParams, 'width').name('Width').min(0).max(1).step(0.001).onFinishChange(update)
graveGui.add(graveParams, 'height').name('Height').min(0).max(1).step(0.001).onFinishChange(update)
graveGui.add(graveParams, 'depth').name('Depth').min(0).max(1).step(0.001).onFinishChange(update)

graveGui.open(false)

export default graves