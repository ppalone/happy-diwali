class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'transparent';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  update(ctx) {
    this.velocity.x *= FRICTION;
    this.velocity.y += GRAVITY;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
    this.draw(ctx);
  }
}

export default Particle;
