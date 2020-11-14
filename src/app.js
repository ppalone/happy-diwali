const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const ctx = canvas.getContext('2d');

const fireworks = [];
const particles = [];

const GRAVITY = 0.005;
const FRICTION = 0.999;

class Firework {
  constructor(fx, fy, color) {
    this.x = fx;
    this.y = HEIGHT;
    this.fx = fx;
    this.fy = fy;
    this.speed = 5;
    this.blown = false;
    this.color = color;
  }

  update() {
    this.draw();
    if (this.y < this.fy) {
      // console.log(this.y, this.fy);
      this.blown = true;

      // Generate Particles
      const PARTICLE_COUNT = 200;
      const ANGLE = (Math.PI * 2) / PARTICLE_COUNT;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(
          new Particle(this.x, this.y, this.color, {
            x: Math.cos(ANGLE * i) * Math.random(),
            y: Math.sin(ANGLE * i) * Math.random(),
          })
        );
      }
    } else {
      this.y -= this.speed;
    }
    // return this.blown;
    // console.log(this.y);
  }

  draw() {
    // ctx.globalAlpha = 1;
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
    this.velocity.x *= FRICTION;
    this.velocity.y += GRAVITY;

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
    this.draw();
  }
}

function animate() {
  // ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  fireworks.forEach((firework, idx) => {
    if (firework.blown) {
      fireworks.splice(idx, 1);
    } else {
      firework.update();
    }
  });

  particles.forEach((particle, idx) => {
    if (particle.alpha < 0) {
      particles.splice(idx, 1);
    } else {
      particle.update();
    }
  });

  requestAnimationFrame(animate);
}

animate();

setInterval(function () {
  let pos = { x: Math.random() * WIDTH, y: (Math.random() * HEIGHT) / 2 };
  let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  // const PARTICLE_COUNT = 200;
  // const ANGLE = (Math.PI * 2) / PARTICLE_COUNT;

  // for (let i = 0; i < PARTICLE_COUNT; i++) {
  //   particles.push(
  //     new Particle(pos.x, pos.y, color, {
  //       x: Math.cos(ANGLE * i) * Math.random(),
  //       y: Math.sin(ANGLE * i) * Math.random(),
  //     })
  //   );
  // }

  fireworks.push(new Firework(pos.x, pos.y, color));
  console.log(fireworks);
}, 2000);

// particles.push(new Particle(Math.random() * WIDTH, Math.random() * HEIGHT / 2, 'white'));

// TEST
// let pos = { x: Math.random() * WIDTH, y: (Math.random() * HEIGHT) / 1.5 };

// const PARTICLE_COUNT = 200;
// const ANGLE = (Math.PI * 2) / PARTICLE_COUNT;

// for (let i = 0; i < PARTICLE_COUNT; i++) {
//   particles.push(
//     new Particle(pos.x, pos.y, 'white', {
//       x: Math.cos(ANGLE * i) * Math.random(),
//       y: Math.sin(ANGLE * i) * Math.random(),
//     })
//   );
// }

// let pos = { x: Math.random() * WIDTH, y: (Math.random() * HEIGHT) / 2 };
// fireworks.push(new Firework(pos.x, pos.y));
