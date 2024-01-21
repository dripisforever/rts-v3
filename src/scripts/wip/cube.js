import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { DragControls } from '/jsm/controls/DragControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Stats from 'three/examples/jsm/libs/stats.module.js'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer()

let mixer;
const loader = new GLTFLoader();
const group = new THREE.Group();
const transformControls = new TransformControls(camera, renderer.domElement);
scene.add(transformControls);

loader.load('models/sm_helmet/scene.gltf', function(glb) {
// loader.load('models/space_marine/scene.gltf', function(glb) {
// loader.load('models/Striker.glb', function(glb) {
// loader.load('https://threejs.org/examples/models/gltf/Soldier.glb', function(glb) {
    const model = glb.scene;

    mixer = new THREE.AnimationMixer(glb.scene)
    mixer.clipAction(glb.animations[0]).play()

    model.position.set(0, 10, 0)
    model.matrixAutoUpdate = false;
    // model.rotation.set(0, 0, 0)
    // root.rotation.set(0, 0, 0)
    // model.scale.set(0.1, 0.1, 0.1);
    model.scale.set(1, 1, 1);

    group.rotation.set(0,Math.PI, 0)
    group.add(model);
    scene.add(group);
    transformControls.attach(group)
    scene.add(group)

    // vehicle.setRenderComponent(model, sync);

    // https://discourse.threejs.org/t/how-do-i-simply-load-a-model-and-run-some-animations/21293/2
    // const animations = glb.animations;
    //
    // mixer = new THREE.AnimationMixer(model);
    //
    // mixer.clipAction(animations[0]).play();
});

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ transparent: true })

// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

const orbitControls = new OrbitControls(camera, renderer.domElement)

// const dragControls = new DragControls([cube], camera, renderer.domElement)
// dragControls.addEventListener('dragstart', function (event) {
//     orbitControls.enabled = false
//     event.object.material.opacity = 0.33
// })
// dragControls.addEventListener('dragend', function (event) {
//     orbitControls.enabled = true
//     event.object.material.opacity = 1
// })

// const transformControls = new TransformControls(camera, renderer.domElement)
// transformControls.attach(cube)
// transformControls.attach(model)

// transformControls.setMode('rotate')
scene.add(transformControls)

transformControls.addEventListener('dragging-changed', function (event) {
    orbitControls.enabled = !event.value
    //dragControls.enabled = !event.value
})

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'g':
            transformControls.setMode('translate')
            break
        case 'r':
            transformControls.setMode('rotate')
            break
        case 's':
            transformControls.setMode('scale')
            break
    }
})

// const backGroundTexture = new THREE.CubeTextureLoader().load([
//     '/img/px_eso0932a.jpg',
//     '/img/nx_eso0932a.jpg',
//     '/img/py_eso0932a.jpg',
//     '/img/ny_eso0932a.jpg',
//     '/img/pz_eso0932a.jpg',
//     '/img/nz_eso0932a.jpg',
// ])
// scene.background = backGroundTexture

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    render()

    // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
