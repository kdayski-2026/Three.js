import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI({ width: 360 })

// Textures
const textureLoader = new THREE.TextureLoader()
const texture1 = textureLoader.load('/textures/particles/1.png')
const texture2 = textureLoader.load('/textures/particles/2.png')
const texture3 = textureLoader.load('/textures/particles/3.png')
const texture4 = textureLoader.load('/textures/particles/4.png')
const texture5 = textureLoader.load('/textures/particles/5.png')
const textures = [texture1, texture2, texture3, texture4, texture5]

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {
    count: 10000,
    size: 0.05,
    radius: 5,
    branches: 3,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 2.5,
    clusterEdge: 0.7,
    galaxies: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
    texture: 4
}

let group = []
let geometry = []
let material = []
let points = []

const disposeGalaxy = () => {
    if (group.length) {
        for (let i = 0; i < group.length; i++) {
            geometry[i].dispose()
            material[i].dispose()
            group[i].remove(points[i])
            scene.remove(group[i])
        }
    }
    group = []
    geometry = []
    material = []
    points = []
}

const generateGalaxy = () => {
    for (let j = 0; j < parameters.galaxies; j++) {
        geometry.push(new THREE.BufferGeometry())
        material.push(new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,

            map: textures[parameters.texture],
            transparent: true,
            alphaMap: textures[parameters.texture]
        }))
        points.push(new THREE.Points(geometry[j], material[j]))
        group.push(new THREE.Group())

        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)

        const colorInside = new THREE.Color(parameters.insideColor)
        const colorOutside = new THREE.Color(parameters.outsideColor)

        for (let i = 0; i < parameters.count; i++) {
            const i3 = i * 3

            // Position
            const radius = (1 - Math.pow(Math.random(), parameters.clusterEdge)) * parameters.radius
            const spinAngle = radius * parameters.spin
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

            positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
            positions[i3 + 1] = 0 + randomY
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

            // Color
            const mixedColor = colorInside.clone()
            mixedColor.lerp(colorOutside, radius / parameters.radius)

            colors[i3 + 0] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
        }

        geometry[j].setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry[j].setAttribute('color', new THREE.BufferAttribute(colors, 3))


        group[j].add(points[j])
        if (j !== 0) {
            group[j].position.x = (Math.random() - 0.5) * 50
            group[j].position.y = (Math.random() - 0.5) * 50
            group[j].position.z = (Math.random() - 0.5) * 50
            group[j].rotation.x = Math.random() * Math.PI * 2
            group[j].rotation.y = Math.random() * Math.PI * 2
            group[j].rotation.z = Math.random() * Math.PI * 2
        }

        scene.add(group[j])
    }
}

generateGalaxy()

const update = () => {
    disposeGalaxy()
    generateGalaxy()
}

gui.add(parameters, 'count', 100, 1000000, 100).onFinishChange(update)
gui.add(parameters, 'size', 0.001, 0.1, 0.001).onFinishChange(update)
gui.add(parameters, 'radius', 0.01, 20, 0.01).onFinishChange(update)
gui.add(parameters, 'branches', 2, 20, 1).onFinishChange(update)
gui.add(parameters, 'spin', -5, 5, 0.001).onFinishChange(update)
gui.add(parameters, 'randomness', 0, 2, 0.001).onFinishChange(update)
gui.add(parameters, 'randomnessPower', 0.01, 12, 0.001).onFinishChange(update)
gui.add(parameters, 'clusterEdge', 0.2, 1, 0.001).onFinishChange(update)
gui.add(parameters, 'galaxies', 1, 5, 1).onFinishChange(update)
gui.addColor(parameters, 'insideColor').onFinishChange(update)
gui.addColor(parameters, 'outsideColor').onFinishChange(update)
gui.add(parameters, 'texture', [0, 1, 2, 3, 4]).onFinishChange(update)

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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

    for (let i = 0; i < group.length; i++) group[i].rotation.y = elapsedTime * 0.02

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()