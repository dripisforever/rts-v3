_showClick(position) {
  this._clickIndicator.position.copy(position);
  this._clickIndicator.scale.set(1, 1, 1);
  this._clickIndicator.visible = true;

  if(this._clickIndicator.animation != null) {
      this._clickIndicator.animation.stop();
  }

  this._clickIndicator.animation = new TWEEN.Tween(this._clickIndicator.scale)
      .to({x: 0.1, y: 1, z: 0.1}, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start()
      .onComplete(() => this._clickIndicator.visible = false);

}
