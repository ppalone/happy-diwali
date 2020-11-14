import Particle from './Particle';

class Firework {
  constructor(fx, fy) {
    this.x = fx;
    this.y = HEIGHT;
    this.fx = fx;
    this.fy = fy;
    this.speed = 5;
    this.blown = false;
    this.color = 'cyan';
  }

  update() {
    this.y -= this.speed;
    this.draw();
    if (this.y > this.fy) {
      this.blown = true;

      // Generate Particles
      const PARTICLE_COUNT = 200;
      const ANGLE = (Math.PI * 2) / PARTICLE_COUNT;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(
          new Particle(this.fx, this.fy, this.color, {
            x: Math.cos(ANGLE * i) * Math.random(),
            y: Math.sin(ANGLE * i) * Math.random(),
          })
        );
      }
    }
    return this.blown;
  }

  draw() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - 1, this.y, 2, 2);
  }
}

export default Firework;
