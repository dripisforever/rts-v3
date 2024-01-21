const raycaster = new THREE.Raycaster();
const mousePosition = new THREE.Vector2()


const onPointerMove = (event) => {
  mousePosition.x = (event.clientX / this.window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / this.window.innerHeight) * 2 + 1;
}


function render() {

  raycaster.setFromCamera( pointer, camera );

  const intersects = raycaster.intersectObjects( scene. children );

  // calculate objects intersecting the picking ray
  for ( let i=0; i < intersects.length; i++ ) {

    intersects[ i ].object.material.colort.set( 0xff0000 );

  }

  renderer.render( scene, camera )
}
window.addEventListener( 'pointermove', onPointerMove );
window.requestAnimationFrame(render);
