import * as THREE from 'three'
import gui from '../../core/gui'
import {
	bushColorTexture,
	bushARMTexture,
	bushNormalTexture
} from '../../core/textures'

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

// Bushes
const bushParams = {
	color: '#ccffcc',
	radius: 1,
	segments: 16,
	rotationX: -0.75
}

const bushes = new THREE.Group()
let bushGeometry = new THREE.SphereGeometry(
	bushParams.radius,
	bushParams.segments,
	bushParams.segments
)
const bushMaterial = new THREE.MeshStandardMaterial({
	color: bushParams.color,
	map: bushColorTexture,
	aoMap: bushARMTexture,
	roughnessMap: bushARMTexture,
	metalnessMap: bushARMTexture,
	normalMap: bushNormalTexture
})

const randomScalar = () => Math.random() * 0.5
const randomX = () => (Math.random() - 0.5) * 4
const randomY = (scalar) => {
	const y = Math.random() * 0.2
	if (y > scalar) return 0.01
	return y
}
const randomZ = () => Math.random() * 0.5 + 2.1

for (let i = 0; i < 5; i++) {
	const bush = new THREE.Mesh(bushGeometry, bushMaterial)
	const scalar = randomScalar()
	const x = randomX()
	const y = randomY()
	const z = randomZ()
	bush.scale.setScalar(scalar)
	bush.position.set(x, y, z)
	bush.rotation.x = bushParams.rotationX
	bushes.add(bush)
}

// Debug
const update = () => {
	bushes.children.forEach((bush) => {
		bush.geometry.dispose()
		bush.geometry = new THREE.SphereGeometry(
			bushParams.radius,
			bushParams.segments,
			bushParams.segments
		)
	})
}

const bushGui = gui.addFolder('Bushes')
bushGui.add(bushMaterial, 'wireframe').name('Wireframe')
bushGui.addColor(bushMaterial, 'color').name('Color')
bushGui.add(bushParams, 'radius').name('Radius').min(0).max(10).step(0.001).onFinishChange(update)
bushGui.add(bushParams, 'segments').name('Segments').min(0).max(124).step(1).onFinishChange(update)


export default bushes