import * as THREE from 'three';
const EventEmitter = require('events')

export default class RTSScene extends EventEmitter {
  constructor(map) {
    this._map = map;

    this._scene = new THREE.Scene()
    this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    this._renderer = new THREE.WebGLRenderer();

    const boundaries = new THREE.Box2(new THREE.Vector2(), new THREE.Vector2())
    this._controls = new RTSControls(this._camera, this._renderer.domElement, this._scene, boundaries)

    // Handling use clicks
    this._raycaster = new THREE.Raycaster();
    document.addEventListener('click', (event) => this._documentMouseClickHandler(event), false);
  }
}
