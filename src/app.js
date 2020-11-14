const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const ctx = canvas.getContext('2d', { alpha: false });

const fireworks = [];
const particles = [];

const GRAVITY = 0.005;

const colors = ['cyan', 'yellow', 'orange', 'white', 'lime'];

class Firework {
  constructor(fx, fy, color, speed) {
    this.x = fx;
    this.y = HEIGHT;
    this.fx = fx;
    this.fy = fy;
    this.speed = speed;
    this.blown = false;
    this.color = color;
  }

  update() {
    this.draw();
    if (this.y < this.fy) {
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
      this.blown = true;
    } else {
      this.y -= this.speed;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.fillRect(this.x - 1, this.y, 2, 4);
  }
}

class Particle {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
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

  update() {
    this.velocity.y += GRAVITY;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
    this.draw();
  }
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  fireworks.forEach((firework, idx) => {
    if (firework.blown) {
      fireworks.splice(idx, 1);
    } else {
      firework.update();
    }
  });
  particles.length > 0 &&
    particles.forEach((particle, idx) => {
      if (particle.alpha <= 0) {
        particles.splice(idx, 1);
      } else {
        particle.update();
      }
    });
  requestAnimationFrame(animate);
}

animate();

setInterval(function () {
  let pos = {
    x: 30 + Math.floor(Math.random() * (WIDTH - 30 * 2)),
    y: 30 + Math.floor(Math.random() * (HEIGHT / 1.5)),
  };
  let color = colors[Math.floor(Math.random() * colors.length)];
  let speed = 4 + Math.floor(Math.random() * 4);
  fireworks.push(new Firework(pos.x, pos.y, color, speed));
}, 2000);
