import * as THREE from 'three'
import gui from '../core/gui'
import {
	lampColorTexture,
	lampARMTexture,
	lampNormalTexture,
	lampDisplacementTexture
} from '../core/textures'

lampColorTexture.wrapS = THREE.RepeatWrapping
lampARMTexture.wrapS = THREE.RepeatWrapping
lampNormalTexture.wrapS = THREE.RepeatWrapping
lampDisplacementTexture.wrapS = THREE.RepeatWrapping

lampColorTexture.repeat.set(3, 1)
lampARMTexture.repeat.set(3, 1)
lampNormalTexture.repeat.set(3, 1)
lampDisplacementTexture.repeat.set(3, 1)

lampColorTexture.colorSpace = THREE.SRGBColorSpace

// Lathe
const latheParams = {
	segments: 6,
	phiStart: 0,
}

const points = [];
for (let i = 0; i < 10; i++) {
	points.push(new THREE.Vector2((Math.sin(i * 0.2) * 10 + 5), ((i - 5) * 2)));
}
const lathe = new THREE.Mesh(
	new THREE.LatheGeometry(
		points,
		latheParams.segments,
		latheParams.phiStart
	),
	new THREE.MeshStandardMaterial({
		map: lampColorTexture,
		aoMap: lampARMTexture,
		roughnessMap: lampARMTexture,
		metalnessMap: lampARMTexture,
		normalMap: lampNormalTexture,
		displacementMap: lampDisplacementTexture
	})
)

lathe.scale.setScalar(0.01)
lathe.castShadow = true
lathe.receiveShadow = true
lathe.position.z = 2.25
lathe.position.y = 2.4
lathe.rotation.x = Math.PI
lathe.material.side = THREE.DoubleSide

// Debug
const update = () => {
	lathe.geometry.dispose()
	lathe.geometry = new THREE.LatheGeometry(
		points,
		latheParams.segments,
		latheParams.phiStart
	)
}

const latheGui = gui.addFolder('lathe')
latheGui.add(lathe.material, 'wireframe').name('Wireframe')
latheGui.add(lathe, 'receiveShadow').name('Can receive shadow')
latheGui.add(lathe, 'castShadow').name('Can cast shadow')
latheGui.add(latheParams, 'segments').min(0).max(20).step(1).name('Segments').onChange(update)
latheGui.add(latheParams, 'phiStart').min(0).max(20).step(0.001).name('Phi Start').onChange(update)
latheGui.add(lathe.position, 'x').min(0).max(20).step(0.001).name('Position X')
latheGui.add(lathe.position, 'y').min(0).max(20).step(0.001).name('Position Y')
latheGui.add(lathe.position, 'z').min(0).max(20).step(0.001).name('Position Z')
latheGui.add(lathe.rotation, 'x').min(0).max(20).step(0.001).name('Rotation X')
latheGui.add(lathe.rotation, 'y').min(0).max(20).step(0.001).name('Rotation Y')
latheGui.add(lathe.rotation, 'z').min(0).max(20).step(0.001).name('Rotation Z')

latheGui.open(false)

export default lathe