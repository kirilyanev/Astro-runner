import platform from '../img/platform.png';

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const gravity = 1.5;
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }

    this.width = 30;
    this.height = 30;
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = { x, y }

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

const image = new Image();
image.src = platform;

const player = new Player();
const platforms = [new Platform({ x: -1, y: 470, image }), new Platform({ x: image.width - 3, y: 470, image })];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  }
}

let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
  platforms.forEach(platform => {
    platform.draw();
  })
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5;
      platforms.forEach(platform => {
        platform.position.x -= 5;
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach(platform => {
        platform.position.x += 5;
      })
    }
  }

  // platform collision detection
  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0;
    }
  })

  if (scrollOffset > 2000) {
    console.log('You win!');
  }
}


animate();

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      console.log('left');
      keys.left.pressed = true;
      break;
    case 's':
      console.log('down');
      break;
    case 'd':
      console.log('right');
      keys.right.pressed = true;
      break;
    case 'w':
      console.log('up');
      player.velocity.y -= 20;
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      console.log('left');
      keys.left.pressed = false;
      break;
    case 's':
      console.log('down');
      break;
    case 'd':
      console.log('right');
      keys.right.pressed = false;
      break;
    case 'w':
      console.log('up');
      player.velocity.y -= 20;
      break;
  }
});