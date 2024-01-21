// REFERENCE: https://www.youtube.com/watch?v=bPKdiaaLoqM

import * as THREE from 'three';
import * as YUKA from 'yuka';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const renderer = new THREE.WebGLRenderer({antialias: true})
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera({});
const light = new THREE.DirectionalLight()


const vehicle = new YUKA.Vehicle();
scene.add(camera)
scene.add(light)
scene.add(vehicle)

vehicle.scale.set(0.15, 0.15, 0.15)




loader.load( 'models/sm_helmet/scene.gltf',  ( gltf ) => {
// loader.load( 'assets/panelka.glb', ( gltf ) => {
  console.log(gltf);
  const model = gltf.scene;
  model.matrixAutoUpdate = false;
  model.position.set(0, 0.8, 0)
  model.rotation.set(0, 4, 0)
  model.scale.set(0.01, 0.01, 0.01);

	scene.add( model );


}, (xhr) => {
  console.log((xhr.loaded / xhr.total * 100) + "% total loaded");
},  ( error ) => {

	console.error( error );

} );


const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
    mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
});


const raycaster = new THREE.Raycaster();

window.addEventListener('click', () => {
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for(let i = 0; i < intersects.length; i++) {
        if(intersects[i].object.name === 'plane')
            target.position.set(intersects[i].point.x, 0, intersects[i].point.z);
    }
});
