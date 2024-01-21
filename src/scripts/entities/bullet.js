class Bullet {

  constructor( position, angle ) {

  }

  get load() {
    const bulletGeometry = new THREE.SphereGeometry( 0.085 )
    const bulletMaterial = new THREE.MeshPhongMaterial({ color: 0x262626 })

    const loader = new GLTFLoader();
    loader.load('models/plasma.glb', (glb) => {
      const model = glb.scene;

    })

    const mesh = new Mesh( bulletGeometry, bulletMaterial );
    mesh.position.set(
      position.x,
      position.y,
      position.z
    )

    const collider = new Box3
  }

  update(deltaT) {
    const travelSpeed = 9;
    const computedMovement = new Vector3(
      travelSpeed * Math.sin(this.angle) * deltaT,
      -travelSpeed * Math.cos(this.angle) * deltaT
    )

    mesh.position.add(computedMovement)

    // Collider
    const colliders =
  }
}
