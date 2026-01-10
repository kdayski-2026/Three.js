import * as THREE from 'three'
import gui from '../core/gui'

/**
 * Ghosts
 */
const ghostsParams = {
	color1: '#8800ff',
	color2: '#ff0088',
	color3: '#ff0000',
	intensity: 6,
	castShadow: true,
	mapSize: 256,
	far: 10
}

const ghost1 = new THREE.PointLight(ghostsParams.color1, ghostsParams.intensity)
const ghost2 = new THREE.PointLight(ghostsParams.color2, ghostsParams.intensity)
const ghost3 = new THREE.PointLight(ghostsParams.color3, ghostsParams.intensity)

ghost1.castShadow = ghostsParams.castShadow
ghost2.castShadow = ghostsParams.castShadow
ghost3.castShadow = ghostsParams.castShadow

ghost1.shadow.mapSize.width = ghostsParams.mapSize
ghost1.shadow.mapSize.height = ghostsParams.mapSize
ghost1.shadow.camera.far = ghostsParams.far

ghost2.shadow.mapSize.width = ghostsParams.mapSize
ghost2.shadow.mapSize.height = ghostsParams.mapSize
ghost2.shadow.camera.far = ghostsParams.far

ghost3.shadow.mapSize.width = ghostsParams.mapSize
ghost3.shadow.mapSize.height = ghostsParams.mapSize
ghost3.shadow.camera.far = ghostsParams.far

// Debug
const update = () => {
	ghost1.castShadow = ghostsParams.castShadow
	ghost2.castShadow = ghostsParams.castShadow
	ghost3.castShadow = ghostsParams.castShadow
	ghost1.intensity = ghostsParams.intensity
	ghost2.intensity = ghostsParams.intensity
	ghost3.intensity = ghostsParams.intensity
}

const ghostsGui = gui.addFolder('Ghosts')
ghostsGui.addColor(ghost1, 'color').name('Ghost 1 color')
ghostsGui.addColor(ghost2, 'color').name('Ghost 2 color')
ghostsGui.addColor(ghost3, 'color').name('Ghost 3 color')
ghostsGui.add(ghostsParams, 'intensity').min(0).max(10).name('Intensity').onChange(update)
ghostsGui.add(ghostsParams, 'castShadow').name('Cast shadow').onChange(update)

ghostsGui.open(false)


export default [ghost1, ghost2, ghost3]