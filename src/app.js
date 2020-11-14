const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

const ctx = canvas.getContext('2d', { alpha: false });

const fireworks = [];
const particles = [];

const GRAVITY = 0.006;

console.log(
  "Wishing you a very Happy & Prosperous Diwali 🎉, Don't forget to leave a star ⭐ at https://github.com/ppalone/happy-diwali"
);

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
      const PARTICLE_COUNT = 100;
      const ANGLE = (Math.PI * 2) / PARTICLE_COUNT;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(
          new Particle(
            this.fx,
            this.fy,
            `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
            {
              x: Math.cos(ANGLE * i) * Math.random(),
              y: Math.sin(ANGLE * i) * Math.random(),
            }
          )
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
    ctx.globalAlpha = this.alpha < 0 ? 0 : this.alpha;
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
  ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  fireworks.forEach((firework, idx) => {
    if (firework.blown) {
      // Remove the old when blown
      fireworks.splice(idx, 1);
      // Spawn New Firework
      let pos = {
        x: 30 + Math.floor(Math.random() * (WIDTH - 30 * 2)),
        y: 30 + Math.floor(Math.random() * (HEIGHT / 2)),
      };
      // let color = colors[Math.floor(Math.random() * colors.length)];
      let speed = 4 + Math.floor(Math.random() * 4);
      fireworks.push(
        new Firework(
          pos.x,
          pos.y,
          `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
          speed
        )
      );
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

function init() {
  let pos = {
    x: 30 + Math.floor(Math.random() * (WIDTH - 30 * 2)),
    y: 30 + Math.floor(Math.random() * (HEIGHT / 2)),
  };
  let speed = 4 + Math.floor(Math.random() * 4);
  fireworks.push(
    new Firework(
      pos.x,
      pos.y,
      `hsl(${Math.floor(Math.random() * 360)},50%, 50%)`,
      speed
    )
  );
}

init();
animate();
