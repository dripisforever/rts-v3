import '../css/style.css';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const keyboard = { };
const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light)

const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.set(10, 15, -15);
// camera.position.set(10, 15, -15);
camera.position.set(3, 3, 3);

const loader = new GLTFLoader();
// loader.load( '../../assets/space_marine/scene.gltf',  ( gltf ) => {
loader.load( 'models/sm_helmet/scene.gltf',  ( gltf ) => {
// loader.load( 'assets/panelka.glb', ( gltf ) => {
  console.log(gltf);
  const root = gltf.scene;
  root.position.set(0, 0.8, 0)
  root.rotation.set(0, 4, 0)
  // root.rotation.set(0, 0, 0)
  root.scale.set(0.01, 0.01, 0.01);

	scene.add( gltf.scene );


}, (xhr) => {
  console.log((xhr.loaded / xhr.total * 100) + "% total loaded");
},  ( error ) => {

	console.error( error );

} );

// loader.load( 'models/panelka.glb', ( gltf ) => {
//   console.log(gltf);
//   const root = gltf.scene;
//   root.position.set(-3, 0, 0)
//   // root.rotation.set(0, -1.8, 0)
//   root.rotation.set(0, 0, 0)
//   root.scale.set(0.15, 0.15, 0.15);
//
// 	scene.add( gltf.scene );
//
//
// }, (xhr) => {
//   console.log((xhr.loaded / xhr.total * 100) + "% total loaded");
// },  ( error ) => {
//
// 	console.error( error );
//
// } );

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = -1; // https://discourse.threejs.org/t/orbit-controls-reverse-mouse-wheel/16643
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	// MIDDLE: THREE.MOUSE.DOLLY,
	MIDDLE: THREE.MOUSE.PAN,
	RIGHT: THREE.MOUSE.PAN
}
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}

// GRID
const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0x0B5394,
    // visible: false,
  })
)
planeMesh.rotateX(-Math.PI / 2);
// planeMesh.rotateZ(-Math.PI / 2);
scene.add(planeMesh)

const grid = new THREE.GridHelper(10, 10)
scene.add(grid)

// CIRCLE ChatGPT
const radiusCirlcle = 6
const segmentsCirlcle = 64
const circleGeometry = new THREE.CircleGeometry(radiusCirlcle, segmentsCirlcle);
const circleMaterial = new THREE.LineBasicMaterial( { color: 0x00FF00 } );
const circle = new THREE.Line(circleGeometry, circleMaterial);
circle.rotation.x = Math.PI / 2; // Rotate the circle to be parallel to the ground

const itemSized = 3;
circleGeometry.setAttribute( 'position',
    new THREE.BufferAttribute(
            circleGeometry.attributes.position.array.slice( itemSized,
                circleGeometry.attributes.position.array.length - itemSized
            ), itemSized
        )
);
circleGeometry.index = null;

scene.add(circle);


// GUI

const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')

cameraFolder.add(camera.position, 'x')
            .min(-90)
            .max(90)
            .step(0.01)
            .name("position X");


cameraFolder.open()

const params = {
  duplicate: function() {

    const duplicate = mesh.clone();
    duplicate.material = duplicate.material.clone();
    duplicate.material.color.set(0xffffff * Math.random());
    duplicate.position.x = 2;
    scene.add(duplicate);

  },
  addPlasma: () => {},
  addGrenadeLauncher: () => {}
}

const dupGui = new GUI();
  dupGui.add(params, 'duplicate')
        .name("reinforce");;
  dupGui.open();

const animate = function () {

    requestAnimationFrame(animate);
    controls.update();
    
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};




animate();
