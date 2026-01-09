import * as THREE from 'three'
import gui from '../core/gui'

/**
 * Lights
 */
// Ambient light
const ambientParams = {
	color: '#86cdff',
	intensity: 0.275
}

const ambientLight = new THREE.AmbientLight(
	ambientParams.color,
	ambientParams.intensity
)

// Directional light
const directionalParams = {
	color: '#86cdff',
	intensity: 1,
	positionX: 3,
	positionY: 2,
	positionZ: -8
}

const directionalLight = new THREE.DirectionalLight(
	directionalParams.color,
	directionalParams.intensity
)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20
directionalLight.position.set(
	directionalParams.positionX,
	directionalParams.positionY,
	directionalParams.positionZ,
)

// Debug
const lightsGui = gui.addFolder('Lights')
lightsGui.add(directionalLight, 'castShadow').name('Sun cast shadow')
lightsGui.addColor(directionalLight, 'color').name('Sun color')
lightsGui.add(directionalLight, 'intensity').min(0).max(1).step(0.001).name('Sun intensity')
lightsGui.add(directionalLight.position, 'x').min(0).max(10).step(0.001).name('Sun position X')
lightsGui.add(directionalLight.position, 'y').min(0).max(10).step(0.001).name('Sun position Y')
lightsGui.add(directionalLight.position, 'z').min(0).max(10).step(0.001).name('Sun position Z')
lightsGui.addColor(ambientLight, 'color').name('Reflection color')
lightsGui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Reflection intensity')

export {
	ambientLight,
	directionalLight
}