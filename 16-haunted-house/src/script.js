import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Timer } from 'three/addons/misc/Timer.js'

// Core
import scene from './core/scene'
import renderer from './core/renderer'
import canvas from './core/canvas'
import sizes from './core/sizes'
import camera from './core/camera'

// Environment
import { ambientLight, directionalLight } from './environment/lights'
import ghosts from './environment/ghosts'
import fog from './environment/fog'
import sky from './environment/sky'

// Components
import floor from './components/floor'
import house from './components/house/house'
import graves from './components/graves'
import lamp from './components/lamp'

scene.add(camera)
scene.add(ambientLight, directionalLight,
    // ...ghosts,
    sky)
scene.add(floor, house, graves, lamp)

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghosts[0].position.x = Math.cos(ghost1Angle) * 4
    ghosts[0].position.z = Math.sin(ghost1Angle) * 4
    ghosts[0].position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.5
    ghosts[1].position.x = Math.cos(ghost2Angle) * 5
    ghosts[1].position.z = Math.sin(ghost2Angle) * 5
    ghosts[1].position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.23
    ghosts[2].position.x = Math.cos(ghost3Angle) * 6
    ghosts[2].position.z = Math.sin(ghost3Angle) * 6
    ghosts[2].position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()