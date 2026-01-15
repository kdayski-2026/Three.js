import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import * as CANNON from 'cannon-es'

/**
 * Debug
 */
const gui = new GUI()
const debugObject = {}
debugObject.createSphere = () => {
    createSphere(
        0.5 * Math.random(),
        {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        }
    )
}
debugObject.createBox = () => {
    createBox(
        Math.random(),
        Math.random(),
        Math.random(),
        {
            x: (Math.random() - 0.5) * 3,
            y: 3,
            z: (Math.random() - 0.5) * 3
        }
    )
}
debugObject.launch = () => {
    const sphere = createSphere(0.5, { x: 0, y: 2.5, z: 4.5 })
    sphere.body.applyLocalForce(new CANNON.Vec3(0, 0, - Math.random() * 500 - 500), new CANNON.Vec3(0, 0, 0))
}
debugObject.reset = () => {
    debugObject.destroy()
    for (let i = 0; i < 5; i++) {
        const x = i - 2
        createBox(1, 1, 1, { x, y: 0.5, z: -4 })
    }
    for (let i = 0; i < 3; i++) {
        const x = i - 1
        createBox(1, 1, 1, { x, y: 1.5, z: -4 })
    }
    createBox(1, 1, 1, { x: 0, y: 2.5, z: -4 })
}
debugObject.destroy = () => {
    for (const object of objectsToUpdate) {
        // Remove body
        object.body.removeEventListener('collide', object.collideCallback)
        object.body.removeEventListener('sleep', object.sleepCallback)
        object.body.removeEventListener('wakeup', object.wakeupCallback)
        sleepSound.loop = false
        wakeupSound.loop = false
        isSleepPlaying = false
        isWakeupPlaying = false
        world.removeBody(object.body)

        // Remove mesh
        scene.remove(object.mesh)
    }
    objectsToUpdate.splice(0, objectsToUpdate.length)
}
gui.add(debugObject, 'createSphere')
gui.add(debugObject, 'createBox')
gui.add(debugObject, 'destroy')
gui.add(debugObject, 'reset')
gui.add(debugObject, 'launch')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const sleepTexture = textureLoader.load('/textures/sleep.webp')
const wakeupTexture = textureLoader.load('/textures/wakeup.webp')

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * sounds
 */
const sleepSound = new Audio('/sounds/sleep.mp3')
const wakeupSound = new Audio('/sounds/huh.mp3')
const hitSounds = {
    ball: [
        new Audio('/sounds/croquet-ball-hit.mp3'),
        // new Audio('/sounds/dodgeball.mp3'),
    ],
    box: [
        new Audio('/sounds/hit.mp3'),
        new Audio('/sounds/hitmarker_1.mp3'),
        new Audio('/sounds/minecrafthit.mp3'),
        new Audio('/sounds/osu-hit-sound.mp3')
    ]
}

let isSoundOnCooldown = false
const playHitSound = async (collision, sound) => {
    if (isSoundOnCooldown) return

    const impactStrength = collision.contact.getImpactVelocityAlongNormal()
    const soundStrength = impactStrength > 10 ? 1 : impactStrength / 10

    if (soundStrength > 0.15) {
        sound.volume = soundStrength
        sound.currentTime = 0
        sound.play()

        isSoundOnCooldown = true
        setTimeout(() => {
            isSoundOnCooldown = false
        }, 30)
    }
}

let isSleepPlaying = false
const playSleepSound = (mesh) => {
    sleepSound.loop = true
    mesh.material.map = sleepTexture
    mesh.material.transparent = true
    mesh.material.alphaMap = sleepTexture
    mesh.material.needsUpdate = true
    if (isWakeupPlaying) {
        wakeupSound.pause()
        wakeupSound.currentTime = 0
        isWakeupPlaying = false
    }

    if (isSleepPlaying) return

    sleepSound.volume = 0.1
    sleepSound.currentTime = 0
    sleepSound.play()
    isSleepPlaying = true
}

let isWakeupPlaying = false
const playWakeupSound = (mesh) => {
    wakeupSound.loop = true
    mesh.material.map = wakeupTexture
    mesh.material.transparent = true
    mesh.material.alphaMap = wakeupTexture
    mesh.material.needsUpdate = true
    if (isSleepPlaying) {
        sleepSound.pause()
        sleepSound.currentTime = 0
        isSleepPlaying = false
    }

    if (isWakeupPlaying) return

    wakeupSound.volume = 0.2
    wakeupSound.currentTime = 0
    wakeupSound.play()
    isWakeupPlaying = true
}

/**
 * Physics
 */
// World
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true
world.gravity.set(0, -9.82, 0)

// Materials
const defaultMaterial = new CANNON.Material('default')

const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)

world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial

// Floor
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body({
    mass: 0,
    shape: floorShape
})
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
world.addBody(floorBody)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */
const objectsToUpdate = []

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const createSphere = (radius, position) => {
    // Three.js mesh
    const defaultMesh = new THREE.MeshStandardMaterial({
        map: wakeupTexture,
        alphaMap: wakeupTexture,
        transparent: true,
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture
    })
    const mesh = new THREE.Mesh(sphereGeometry, defaultMesh)
    mesh.scale.setScalar(radius)
    mesh.position.copy(position)
    mesh.castShadow = true
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    const sound = hitSounds['ball'][Math.floor(Math.random() * hitSounds['ball'].length)]
    body.addEventListener('collide', (collision) => playHitSound(collision, sound))
    body.addEventListener('sleep', () => playSleepSound(mesh))
    body.addEventListener('wakeup', () => playWakeupSound(mesh))
    world.addBody(body)

    // Save in objects to update
    objectsToUpdate.push({
        mesh,
        body
    })

    return {
        mesh,
        body
    }
}
const createBox = (width, height, depth, position) => {
    // Three.js mesh
    const defaultMesh = new THREE.MeshStandardMaterial({
        map: wakeupTexture,
        alphaMap: wakeupTexture,
        transparent: true,
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture
    })
    const mesh = new THREE.Mesh(boxGeometry, defaultMesh)
    mesh.scale.set(width, height, depth)
    mesh.position.copy(position)
    mesh.castShadow = true
    scene.add(mesh)

    // Cannon.js body
    const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    const sound = hitSounds['box'][Math.floor(Math.random() * hitSounds['box'].length)]
    body.addEventListener('collide', (collision) => playHitSound(collision, sound))
    body.addEventListener('sleep', () => playSleepSound(mesh))
    body.addEventListener('wakeup', () => playWakeupSound(mesh))
    world.addBody(body)

    // Save in objects to update
    objectsToUpdate.push({
        mesh,
        body
    })
}

for (let i = 0; i < 5; i++) {
    const x = i - 2
    createBox(1, 1, 1, { x, y: 0.5, z: -4 })
}
for (let i = 0; i < 3; i++) {
    const x = i - 1
    createBox(1, 1, 1, { x, y: 1.5, z: -4 })
}
createBox(1, 1, 1, { x: 0, y: 2.5, z: -4 })

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // Update physics world
    world.step(1 / 60, deltaTime, 3)

    for (const object of objectsToUpdate) {
        object.mesh.position.copy(object.body.position)
        object.mesh.quaternion.copy(object.body.quaternion)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()