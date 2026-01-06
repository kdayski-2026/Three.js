import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.visible = false
const ambientGui = gui.addFolder('Ambient light')
ambientGui.add(ambientLight, 'visible')
ambientGui.addColor(ambientLight, 'color')
ambientGui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
directionalLight.position.set(1, 0.25, 0)
directionalLight.visible = false
const directionalGui = gui.addFolder('Directional light')
directionalGui.add(directionalLight, 'visible')
directionalGui.addColor(directionalLight, 'color')
directionalGui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
directionalGui.add(directionalLight.position, 'x').min(0).max(3).step(0.001)
directionalGui.add(directionalLight.position, 'y').min(0).max(3).step(0.001)
directionalGui.add(directionalLight.position, 'z').min(0).max(3).step(0.001)
scene.add(directionalLight)

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
hemisphereLight.visible = false
const hemisphereGui = gui.addFolder('Hemisphere light')
hemisphereGui.add(hemisphereLight, 'visible')
hemisphereGui.addColor(hemisphereLight, 'color')
hemisphereGui.addColor(hemisphereLight, 'groundColor')
hemisphereGui.add(hemisphereLight, 'intensity').min(0).max(3).step(0.001)
scene.add(hemisphereLight)

// Point light
const pointLight = new THREE.PointLight(0xff9000, 1.5, 3)
pointLight.position.set(1, -0.5, 1)
pointLight.visible = false
const pointGui = gui.addFolder('Point light')
pointGui.add(pointLight, 'visible')
pointGui.addColor(pointLight, 'color')
pointGui.add(pointLight, 'intensity').min(0).max(3).step(0.001)
pointGui.add(pointLight, 'distance').min(0).max(10).step(0.001)
pointGui.add(pointLight.position, 'x').min(0).max(3).step(0.001)
pointGui.add(pointLight.position, 'y').min(0).max(3).step(0.001)
pointGui.add(pointLight.position, 'z').min(0).max(3).step(0.001)
scene.add(pointLight)

// Rect area light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
rectAreaLight.visible = false
const rectAreaGui = gui.addFolder('Rect area light')
rectAreaGui.add(rectAreaLight, 'visible')
rectAreaGui.addColor(rectAreaLight, 'color')
rectAreaGui.add(rectAreaLight, 'intensity').min(0).max(10).step(0.001)
rectAreaGui.add(rectAreaLight, 'width').min(0).max(3).step(0.001)
rectAreaGui.add(rectAreaLight, 'height').min(0).max(3).step(0.001)
rectAreaGui.add(rectAreaLight.position, 'x').min(0).max(3).step(0.001)
rectAreaGui.add(rectAreaLight.position, 'y').min(0).max(3).step(0.001)
rectAreaGui.add(rectAreaLight.position, 'z').min(0).max(3).step(0.001)
scene.add(rectAreaLight)

// Spot light
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
spotLight.visible = false
const spotGui = gui.addFolder('Spot light')
spotGui.add(spotLight, 'visible')
spotGui.addColor(spotLight, 'color')
spotGui.add(spotLight, 'intensity').min(0).max(3).step(0.001)
spotGui.add(spotLight, 'distance').min(0).max(10).step(0.001)
spotGui.add(spotLight, 'angle').min(0).max(Math.PI).step(0.001)
spotGui.add(spotLight, 'penumbra').min(0).max(1).step(0.001)
spotGui.add(spotLight, 'decay').min(0).max(3).step(0.001)
spotGui.add(spotLight.position, 'x').min(0).max(3).step(0.001)
spotGui.add(spotLight.position, 'y').min(0).max(3).step(0.001)
spotGui.add(spotLight.position, 'z').min(0).max(3).step(0.001)
scene.add(spotLight)

spotLight.target.position.x = -0.75
spotGui.add(spotLight.target.position, 'x').min(-3).max(3).step(0.001)
spotGui.add(spotLight.target.position, 'y').min(-3).max(3).step(0.001)
spotGui.add(spotLight.target.position, 'z').min(-3).max(3).step(0.001)
scene.add(spotLight.target)

/**
 * Helpers
 */
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.2)
scene.add(spotLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight, 0.2)
scene.add(rectAreaLightHelper)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()