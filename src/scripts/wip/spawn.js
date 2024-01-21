function animate() {
  requestAnimationFrame(animate);

  // Create a new sphere every 2 seconds
  if (Date.now() % 2000 === 0) {
    const geometry = new THREE.SphereGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);

    // Set random position within a range
    sphere.position.set(
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5
    );

    scene.add(sphere);
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();
