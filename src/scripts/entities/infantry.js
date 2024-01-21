class Infantry {

  constructor() {

  }

  shoot() {
    const offset = new THREE.Vector3(
       Math.sin( this._rotation ) * 3,
      -Math.cos( this._rotation ) * 3,
       0,
    )
    const shootingPosition = this._mesh.position.clone().add( offset )

    const bullet = new Bullet( shootingPosition, this._rotation )
    await bullet.load();
    
  }
}
