
import * as THREE from 'three'
import { Sky } from 'three/addons/objects/Sky.js'
import gui from '../core/gui'
import renderer from '../core/renderer'
import scene from '../core/scene'
import camera from '../core/camera'

/**
 * Sky
 */
const sky = new Sky()
const sun = new THREE.Vector3();
sky.scale.setScalar(100)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// Debug
const effectController = {
	turbidity: 10,
	rayleigh: 3,
	mieCoefficient: 0.1,
	mieDirectionalG: 0.95,
	elevation: 2,
	azimuth: 180,
	exposure: renderer.toneMappingExposure
};

const guiChanged = () => {
	const uniforms = sky.material.uniforms;
	uniforms['turbidity'].value = effectController.turbidity;
	uniforms['rayleigh'].value = effectController.rayleigh;
	uniforms['mieCoefficient'].value = effectController.mieCoefficient;
	uniforms['mieDirectionalG'].value = effectController.mieDirectionalG;
	const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
	const theta = THREE.MathUtils.degToRad(effectController.azimuth);

	sun.setFromSphericalCoords(1, phi, theta);
	uniforms['sunPosition'].value.copy(sun);
	renderer.toneMappingExposure = effectController.exposure;
	renderer.render(scene, camera);
}

const skyGui = gui.addFolder('Sky')
skyGui.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged);
skyGui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged);
skyGui.add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(guiChanged);
skyGui.add(effectController, 'mieDirectionalG', 0.0, 1, 0.001).onChange(guiChanged);
skyGui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged);
skyGui.add(effectController, 'azimuth', - 180, 180, 0.1).onChange(guiChanged);
skyGui.add(effectController, 'exposure', 0, 1, 0.0001).onChange(guiChanged);

export default sky