const canvas = document.querySelector("#effects");
const c = canvas.getContext("2d");

const MAX_RADIUS = 40;

// particle class
class Particle {
  constructor({ position, velocity, radius, color }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();

    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    const dist = Math.round(
      Math.hypot(mouse.x - this.position.x, mouse.y - this.position.y) * 2
    );
    const alpha = dist > 255 - 0x10 ? 255 - 0x10 : dist < 0 ? 0 : dist;
    c.fillStyle = `${this.color}${(255 - alpha).toString(16)}`;
    c.fill();

    c.closePath();
  }

  update() {
    // bouce off the edge of the screen
    if (
      this.position.x - this.radius + this.velocity.x < 0 ||
      this.position.x + this.radius + this.velocity.x > canvas.width
    )
      this.velocity.x = -this.velocity.x;

    if (
      this.position.y - this.radius + this.velocity.y < 0 ||
      this.position.y + this.radius + this.velocity.y > canvas.height
    )
      this.velocity.y = -this.velocity.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // change size based on the distance to the mouse
    if (
      Math.hypot(mouse.x - this.position.x, mouse.y - this.position.y) < 100 &&
      this.radius < MAX_RADIUS
    )
      this.radius++;
    else if (this.radius > this.minRadius) this.radius--;

    this.draw();
  }
}

// star class
class Star {
  constructor({position, radius, color}) {
    this.position = position
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()

    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.shadowColor = this.color
    c.shadowBlur = 10
    c.fillStyle = this.color
    c.fill()

    c.closePath()
  }

  update() {
    this.draw()
  }
}

let particles = [];
const effectType = Math.floor(Math.random() * 2) + 1
const mouse = {
  x: -1000,
  y: -1000,
};
const colors = ["#348888", "#22BABB", "#9EF8EE", "#FA7F08", "#F24405"];

function init() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  particles = [];
  let x, y, dx, dy, radius, color;
  for (let i = 0; i < 500; i++) {
    color = colors[Math.floor(Math.random() * colors.length)];
    if (effectType == 1) {
      // particles highlighting when near to the mouse
      x = Math.random() * (canvas.width - radius * 2) + radius;
      y = Math.random() * (canvas.height - radius * 2) + radius;
      dx = (Math.random() - 0.5) * 6;
      dy = (Math.random() - 0.5) * 6;
      radius = Math.random() * 4 + 1;

      particles.push(
        new Particle({
          position: {
            x: x,
            y: y,
          },
          velocity: {
            x: dx,
            y: dy,
          },
          radius: radius,
          color: color,
        })
      );
    } else {
      // galaxy effect
      const areaWidth = canvas.width > canvas.height ? canvas.width + 300 : canvas.height + 300
      const areaHeight = areaWidth

      x = (Math.random() - 0.5) * areaWidth
      y = (Math.random() - 0.5) * areaHeight
      radius = Math.random() * 3 + 2

      particles.push(
        new Star({
          position: {
            x: x,
            y: y
          },
          radius: radius,
          color: color
        })
      )
    }
  }

  if (!animationId) animate();
}

addEventListener("resize", init);
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

let animationId;
let rotation = 0
function animate() {
  animationId = requestAnimationFrame(animate);

  if (effectType == 1) {
    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
    });
  } else if (effectType == 2) {
    c.fillStyle = "#0002";
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save()

    c.translate(canvas.width / 2, canvas.height/2)
    c.rotate(rotation)

    particles.forEach((particle) => {
      particle.update();
    });

    c.restore()

    rotation += 0.01
  }
}

onload = () => {
  for (let i = 0; i < games.length; i++) {
    const gameCategory = new Category({
      title: games[i][0],
    });

    gamesContainer.append(gameCategory.createEl());
  }

  const gameCategories = Array.from(
    document.querySelectorAll(".game-container")
  );

  for (let i = 0; i < gameCategories.length; i++) {
    for (let j = 1; j < games[i].length; j++) {
      const game = games[i][j];

      gameCategories[i].append(game.createEl());
    }
  }

  init();
};
