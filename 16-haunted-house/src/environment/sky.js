
import { Sky } from 'three/addons/objects/Sky.js'
import gui from '../core/gui'
/**
 * Sky
 */
const sky = new Sky()
sky.scale.setScalar(100)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// Debug
const skyGui = gui.addFolder('Sky')
skyGui.add(sky.material.uniforms['turbidity'], 'value').min(0).max(10).step(0.001).name('Turbidity')
skyGui.add(sky.material.uniforms['rayleigh'], 'value').min(0).max(10).step(0.001).name('Rayleigh')
skyGui.add(sky.material.uniforms['mieCoefficient'], 'value').min(0).max(10).step(0.001).name('Mie coefficient')
skyGui.add(sky.material.uniforms['mieDirectionalG'], 'value').min(0).max(10).step(0.001).name('Mie directional g')
skyGui.add(sky.material.uniforms['sunPosition'].value, 'x').min(-5).max(5).step(0.0001).name('Sun position x')
skyGui.add(sky.material.uniforms['sunPosition'].value, 'y').min(-5).max(5).step(0.0001).name('Sun position y')
skyGui.add(sky.material.uniforms['sunPosition'].value, 'z').min(-5).max(5).step(0.0001).name('Sun position z')

export default sky