import * as THREE from 'three'
import scene from "../core/scene"
/**
 * Fog
 */
// scene.fog = new THREE.Fog('#02343f', 1, 13)
scene.fog = new THREE.FogExp2('#02343f', 0.1)

export default scene.fog