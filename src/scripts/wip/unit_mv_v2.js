import * as THREE from 'three';
import * as YUKA from 'yuka';
import { GUI } from 'dat.gui';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'

let mixer;
const keyboard = {}
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

renderer.setClearColor(0xA3A3A3);

// GRID
const planeMeshG = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0x0B5394,
    // visible: false,
  })
)
planeMeshG.rotateX(-Math.PI / 2);
// planeMesh.rotateZ(-Math.PI / 2);
scene.add(planeMeshG)

const grid = new THREE.GridHelper(40, 40)
scene.add(grid)


//
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// camera.position.set(3, 3, 3);
// // // camera.position.set(0, 10, 4);
// camera.lookAt(scene.position);


camera.position.set(0, 10, -20);
camera.lookAt(new THREE.Vector3(0,player.height,0));


// ORBIT
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = -1; // https://discourse.threejs.org/t/orbit-controls-reverse-mouse-wheel/16643
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	// MIDDLE: THREE.MOUSE.DOLLY,
	MIDDLE: THREE.MOUSE.PAN,
	// RIGHT: THREE.MOUSE.PAN
}

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);


const vehicle = new YUKA.Vehicle();

vehicle.scale.set(0.15, 0.15, 0.15);
// vehicle.scale.set(2, 2, 2);
// vehicle.rotation.set(0, 0.5, 0);

function sync(entity, renderComponent) {
    renderComponent.matrix.copy(entity.worldMatrix);
}

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const loader = new GLTFLoader();
const group = new THREE.Group();
let modelReady = false

const transformControls = new TransformControls(camera, renderer.domElement);
scene.add(transformControls);

// loader.load('models/sm_helmet/scene.gltf', function(glb) {
loader.load(
  // 'models/low_poly_humanoid_robot/scene.gltf',
  'models/sm_helmet/scene.gltf',
  (glb) => {
// loader.load('models/space_marine/scene.gltf', function(glb) {
// loader.load('models/Striker.glb', function(glb) {
// loader.load('https://threejs.org/examples/models/gltf/Soldier.glb', function(glb) {
    const model = glb.scene;
    // mixer = new THREE.AnimationMixer(glb.scene)
    // mixer.clipAction(glb.animations[0]).play()

    model.position.set(0, 10, 0)
    model.matrixAutoUpdate = false;
    // model.rotation.set(0, 0, 0)
    // root.rotation.set(0, 0, 0)
    // model.scale.set(0.1, 0.1, 0.1);
    model.scale.set(2, 2, 2);

    // group.rotation.set(0, Math.PI, 0)

    group.add(model);
    scene.add(group);
    // transformControls.attach(group)
    // scene.add(group)
    vehicle.setRenderComponent(model, sync);

    // https://discourse.threejs.org/t/how-do-i-simply-load-a-model-and-run-some-animations/21293/2
    const animations = glb.animations;

    console.log(animations[0]);
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(animations[0]).play();
    // mixer.clipAction(animations[0])

    modelReady = true;
  },

  (xhr) => {
    console.log('loaded');
  },

  (error) => {
    console.log('error');
  }


);



const target = new YUKA.GameEntity();
//target.setRenderComponent(targetMesh, sync);
entityManager.add(target);

const arriveBehavior = new YUKA.ArriveBehavior(target.position, 3, 0.5);
vehicle.steering.add(arriveBehavior);

vehicle.position.set(0, 0, 0);
// vehicle.position.set(-3, 0, -3);
// vehicle.rotation.set(0, 0, 0);

vehicle.maxSpeed = 10;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
});

const planeGeo = new THREE.PlaneGeometry(40, 40);
const planeMat = new THREE.MeshBasicMaterial({
  visible: false,
  // color: 0x347C8B,
});
const planeMesh = new THREE.Mesh(planeGeo, planeMat);
planeMesh.rotation.x = -0.5 * Math.PI;
scene.add(planeMesh);
planeMesh.name = 'plane';

const raycaster = new THREE.Raycaster();

// REFERENCE: https://stackoverflow.com/a/75039878/6250186
document.body.addEventListener("mousedown", event => {
  if (event.button == 0) { // left click for mouse
      // alert("left click");
  } else if (event.button == 1) { // wheel click for mouse
      // alert("wheel click");
  } else if (event.button == 2) {   // right click for mouse
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.name === 'plane')
            target.position.set(intersects[i].point.x, 0, intersects[i].point.z); // x and z
    }
  }
});


// setInterval(function(){
//     const x = Math.random() * 3;
//     const y = Math.random() * 3;
//     const z = Math.random() * 3;

//     target.position.set(x, y, z);
// }, 2000);

const time = new YUKA.Time();
const clock = new THREE.Clock();

const gui = new GUI()

function animate(t) {
    const delta = time.update().getDelta();
    entityManager.update(delta);
    // group.position.y = 0.01 * Math.sin(t / 500);
    // group.position.y = 0.5
    group.position.set(0, 0.5, 0);
    // group.rotation.set(0, Math.PI, 0)
    // group.rotation.set(0, 0, 0);
    // group.rotation.y = 3
    // renderer.render(scene, camera);


    // requestAnimationFrame(animate);

    if (modelReady) mixer.update(clock.getDelta());
    // if (modelReady) mixer.update(delta);

    if ( keyboard[87]) {
      camera.position.x -= Math.sin( camera.rotation.y ) * 0.2;
      camera.position.z -= - Math.cos( camera.rotation.y ) * 0.2;
      console.log("W");
    }
    if ( keyboard[83]) {
      camera.position.x += Math.sin( camera.rotation.y ) * 0.2;
      camera.position.z += - Math.cos( camera.rotation.y ) * 0.2;
      console.log("S");
    }
    if(keyboard[65]){ // A key
  		// Redirect motion by 90 degrees
  		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * 0.2;
  		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * 0.2;
      console.log("A");
    }
  	if(keyboard[68]){ // D key
  		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * 0.2;
  		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * 0.2;
      console.log("D");
    }

    if ( keyboard[37]) {
      camera.rotation.y -= Math.PI * 0.01;
    }
    if ( keyboard[39]) {
      camera.rotation.y += Math.PI * 0.01;
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
