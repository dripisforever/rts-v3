import * as THREE from 'three';

export default class RTSMap  {
  constructor() {

  }
  initialize(scene) {

    // Loading lights from map
    this.createLight(scene);


  }

  createLight(scene) {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 2).normalize();
    dirLight.lookAt(new THREE.Vector3(0, 0, 0));

    scene.add(dirLight);
  }
}
