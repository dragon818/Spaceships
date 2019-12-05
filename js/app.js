
// The GOAL!
// Once the player touches the SUN, they make it to the next level.

class Sun {
  constructor(x = 450, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Enemy {
  constructor(x, y, style, direction) {
    this.x = x;
    this.y = y;
    this.style = style;
    this.direction = direction;
    this.speed = Math.floor(Math.random() * 5 + 1);
  }

  update (dt) {
    if (parseInt(document.querySelector("#score span").textContent) === 1) {
      this.speed = Math.floor(Math.random() * 5 + 5);
    } else if (parseInt(document.querySelector("#score span").textContent) === 2) {
      this.speed = Math.floor(Math.random() * 5 + 10);
    } else if (parseInt(document.querySelector("#score span").textContent) === 3) {
      this.speed = Math.floor(Math.random() * 5 + 15);
    } else if (parseInt(document.querySelector("#score span").textContent) === 4) {
      this.speed = Math.floor(Math.random() * 5 + 20);
    } else if (parseInt(document.querySelector("#score span").textContent) === 5) {
      this.speed = Math.floor(Math.random() * 5 + 25);
    } 
    
    if (this.direction === "ltr") {
      if(this.x >= 800 ) {
        this.direction = "rtl";
      }
      this.x += this.speed;
    } else if (this.direction === "rtl") {
      if (this.x <= 0) {
        this.direction = "ltr";
      }
      this.x -= this.speed;
    }
  }
}

class Player {
  constructor (x = 450, y = 400) {
    this.x = x;
    this.y = y;
  }
  update () {
    allEnemies.forEach(enemy => {
      if (Math.abs(enemy.x - this.x) <= 80 && Math.abs(enemy.y -this.y) <= 80) {

        if (document.querySelector("#lives span").textContent === "0") {

          Swal.fire({
            title: 'Game over',
            text: `Your hightest level is ${document.querySelector("#score").textContent}`,
          });

          document.querySelector("#lives span").textContent = "3";
          document.querySelector("#score span").textContent = "0";
          allEnemies.forEach(ene => ene.speed = Math.floor(Math.random() * 5 + 1));
        } else {
          document.querySelector("#lives span").textContent = `${parseInt(document.querySelector("#lives span").textContent)- 1}`;
        }
        this.x = 450;
        this.y = 400; 
      }
    });

    if ((Math.abs(this.x - sun.x) <= 50 && Math.abs(this.y - sun.y) <= 50)) {
    
      document.querySelector("#score span").textContent = `${parseInt(document.querySelector("#score span").textContent) + 1}`;
      
      this.x = 450;
      this.y = 400;
    }
  }

  handleInput (diret) {
    if (diret === "left" && this.x > 0) { 
      this.x -= 50;
    } else if (diret === "up" && this.y > 0) {
      this.y -= 50;
    } else if (diret === "right" && this.x < 800) {
      this.x += 50;
    } else if (diret === "down" && this.y < 400) { 
      this.y += 50;
    }
  }
}

const allEnemies = [
  new Enemy (Math.floor(Math.random()*800), 50, "enemy1", "ltr"),
  new Enemy (Math.floor(Math.random()*800), 150, "enemy2", "ltr"),
  new Enemy (Math.floor(Math.random()*800), 250, "enemy3", "ltr")
];

const player = new Player();
const sun = new Sun();
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
