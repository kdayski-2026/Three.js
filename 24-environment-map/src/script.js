import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import GUI from 'lil-gui'

/**
 * Loaders
 */
const exrLoader = new EXRLoader()
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
const textureLoader = new THREE.TextureLoader()

dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 280 })
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Environment map
 */
scene.environmentIntensity = 1
scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1
// scene.backgroundRotation.x = 1
// scene.environmentRotation.x = 2

gui.add(scene, 'environmentIntensity', 0, 10, 0.001)
gui.add(scene, 'backgroundBlurriness', 0, 1, 0.001)
gui.add(scene, 'backgroundIntensity', 0, 10, 0.001)
gui.add(scene.backgroundRotation, 'y', 0, Math.PI * 2, 0.001).name('backgroundRotationY')
gui.add(scene.environmentRotation, 'y', 0, Math.PI * 2, 0.001).name('environmentRotationY')

const envs = {}

// LDR cube texture
envs.cubeTexture = cubeTextureLoader.load([
    '/environmentMaps/0/px.png',
    '/environmentMaps/0/nx.png',
    '/environmentMaps/0/py.png',
    '/environmentMaps/0/ny.png',
    '/environmentMaps/0/pz.png',
    '/environmentMaps/0/nz.png',
])

// HDR (RGBE) equirectangular
rgbeLoader.load('/environmentMaps/blender-2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    envs.blender = environmentMap
})

// HDR (EXR) equirectangular
exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    envs.nvidiaCanvas = environmentMap
})

// LDR equirectangular
envs.blockadeLabs = textureLoader.load('/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
envs.blockadeLabs.mapping = THREE.EquirectangularReflectionMapping
envs.blockadeLabs.colorSpace = THREE.SRGBColorSpace

debugObject.environment = 'blockadeLabs'
const update = () => {
    scene.background = envs[debugObject.environment]
    scene.environment = envs[debugObject.environment]
    if (debugObject.environment === 'blender') {
        scene.background = null
    }
}
gui.add(debugObject, 'environment', ['nvidiaCanvas', 'blender', 'cubeTexture', 'blockadeLabs']).onChange(update)
update()

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 1,
        color: 0xaaaaaa
    })
)
torusKnot.position.x = -4
torusKnot.position.y = 4
scene.add(torusKnot)

/**
 * Models
 */
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.setScalar(10)
        scene.add(gltf.scene)
    }
)

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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
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
let init = false
const clock = new THREE.Clock()
const tick = () => {
    // Time
    const elapsedTime = clock.getElapsedTime()

    if (!init && envs[debugObject.environment]) {
        update()
        init = true
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()