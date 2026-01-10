import * as THREE from 'three'
import scene from "../core/scene"
import gui from '../core/gui'
import renderer from '../core/renderer'
import camera from '../core/camera'
/**
 * Fog
 */
const params = {
	color: '#0a2633',
	density: 0.066
}

scene.fog = new THREE.FogExp2(
	params.color,
	params.density
)

// Debug
const fogGui = gui.addFolder('Fog')
fogGui.addColor(params, 'color').name('Color').onChange(() => {
	scene.fog.color.set(params.color)
})
fogGui.add(scene.fog, 'density').min(0).max(1).step(0.001).name('Density')

export default scene.fog