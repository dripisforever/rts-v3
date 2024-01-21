import * as THREE from 'three';

export class Game {

  inputManager;

  focusedObject = null;

  selectedObject = null;

  constructor() {

    this.raycaster = new THREE.Raycaster();
    
  }

  #raycast() {

  }
}

window.onload = () => {
  window.game = new Game();
}
