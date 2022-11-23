window.addEventListener("load", function () {
  //waits for elements to be loaded before resuming.
  const canvas = document.getElementById("canvas"); //get the canvas element
  const ctx = canvas.getContext("2d"); // this provides the 2d drawing functions, and sets them into ctx for future reference.
  canvas.width = 1380;
  canvas.height = 740;

  class inputHandler {
    //this will handle the keys used for sprite movement. It will run and have acces to everthing in the game object
    constructor(portfolio) {
      this.portfolio = portfolio;
      window.addEventListener("keydown", (e) => {
        //using the arrow function is how this.game.lastKey is able to see this.game within this object, outside of the function
        this.portfolio.lastKey = "D" + e.key;
      });
      window.addEventListener("keyup", (e) => {
        this.portfolio.lastKey = "U" + e.key;
      });
    }
  }
  // holds everything to do with the me sprite, and is connected to the game object, having access to everything in the game object.
  class Me {
    constructor(portfolio) {
      this.portfolio = portfolio;
      this.spriteHeight = 496;
      this.spriteWidth = 247;
      this.frameX = 0; //this.frame(s) sets which sprite is being targeted in the sprite sheet. 0,0 is top left, 0,1 would access the second row first column.
      this.frameY = 0;
      this.maxFrame = 7; // this sets how many frames are in each row. (My spritesheet has 8 as we start at 0)
      this.height = 100;
      this.width = 50;
      this.x = 600; //this.x/y will be the starting location of the sprite when window is rendered.
      this.y = 10;
      this.speedX = 0; //this.speed will determin how many pixels sprite moves
      this.speedY = 0;
      this.image = document.getElementById("meSprite"); //this grabs the spritesheet referenced by its id
      this.fps = 7; //this modifes fps, as if reguestAnimationFrame is left to default it runs way too fast.
      this.frameInterval = 1000 / this.fps;
      this.FrameTimer = 0;
    }
    draw(context) {
      //class Me has access to draw() from the game object.
      context.drawImage(
        this.image, //spritesheet
        this.frameX * this.spriteWidth, //drawing the selected sprite into its location by the specified w/h
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    setSpeed(speedX, speedY) {
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update(deltaTime) {
      //conditionals that determin where and when the sprite moves depending on keydown/up events
      if (this.portfolio.lastKey == "DArrowLeft") {
        this.setSpeed(-3, 0);
        this.frameY = 7;
      } else if (this.portfolio.lastKey == "UArrowLeft") {
        this.setSpeed(0, 0);
        this.frameY = 6;
      } else if (this.portfolio.lastKey == "DArrowRight") {
        this.setSpeed(3, 0);
        this.frameY = 5;
      } else if (this.portfolio.lastKey == "UArrowRight") {
        this.setSpeed(0, 0);
        this.frameY = 4;
      } else if (this.portfolio.lastKey == "DArrowUp") {
        this.setSpeed(0, -1);
        this.frameY = 3;
      } else if (this.portfolio.lastKey == "UArrowUp") {
        this.setSpeed(0, 0);
        this.frameY = 2;
      } else if (this.portfolio.lastKey == "DArrowDown") {
        this.setSpeed(0, 1);
        this.frameY = 1;
      } else if (this.portfolio.lastKey == "UArrowDown") {
        this.setSpeed(0, 0);
        this.frameY = 0;
      }
      this.x += this.speedX;
      this.y += this.speedY;

      //   horizontal boundaries
      if (this.x < 0) {
        //if sprite is less then left wall, it stays at 0, will not go further
        this.x = 0;
      } else if (this.x > this.portfolio.width - this.width) {
        this.x = this.portfolio.width - this.width;
      }
      // vertical boundaries
      if (this.y < 0) {
        this.y = 0;
      } else if (this.y > this.portfolio.height - this.height) {
        this.y = this.portfolio.height - this.height;
      }
      // Animate me sprite through the spritesheet frames
      if (this.FrameTimer > this.frameInterval) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
        this.FrameTimer = 0;
      } else {
        this.FrameTimer += deltaTime;
      }
    }
  }
  class Object {
    constructor(portfolio) {
      this.portfolio = portfolio;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
  class Cabin1 extends Object {
    constructor(portfolio) {
      super(portfolio);
      this.portfolio = portfolio;
      this.image = document.getElementById("cabin1Sprite");
      this.imageWidth = 300;
      this.imageHeight = 190;
      this.width = this.imageWidth;
      this.height = this.imageHeight;
      this.x = 100;
      this.y = 200;
    }
  }
  class Cabin2 extends Object {
    constructor(portfolio) {
      super(portfolio);
      this.portfolio = portfolio;
      this.image = document.getElementById("cabin2Sprite");
      this.imageWidth = 300;
      this.imageHeight = 190;
      this.width = this.imageWidth;
      this.height = this.imageHeight;
      this.x = 900;
      this.y = 100;
    }
  }
  class Pond extends Object {
    constructor(portfolio) {
      super(portfolio);
      this.portfolio = portfolio;
      this.image = document.getElementById("pond");
      this.imageWidth = 300;
      this.imageHeight = 190;
      this.width = this.imageWidth;
      this.height = this.imageHeight;
      this.x = 950;
      this.y = 450;
    }
  }

  class Path extends Object {
    constructor(portfolio) {
      super(portfolio);
      this.portfolio = portfolio;
      this.image = document.getElementById("vdirtPath");
      this.imageWidth = 100;
      this.imageHeight = 490;
      this.width = this.imageWidth;
      this.height = this.imageHeight;
      this.x = 600;
      this.y = 0;
    }
  }
  class Path2 extends Object {
    constructor(portfolio) {
      super(portfolio);
      this.portfolio = portfolio;
      this.image = document.getElementById("hdirtPath");
      this.imageWidth = 600;
      this.imageHeight = 100;
      this.width = this.imageWidth;
      this.height = this.imageHeight;
      this.x = 0;
      this.y = 390;
    }
  }

  class Portfolio {
    constructor(width, height) {
      //constructor will create js object.
      this.width = width;
      this.height = height;
      this.lastKey = undefined;
      this.input = new inputHandler(this);
      this.me = new Me(this);
      this.cabin1 = new Cabin1(this);
      this.cabin2 = new Cabin2(this);
      this.path = new Path(this);
      this.path2 = new Path2(this);
      this.pond = new Pond(this);
    }
    render(context, deltaTime) {
      this.cabin1.draw(context);
      this.cabin2.draw(context);
      this.path.draw(context);
      this.path2.draw(context);
      this.pond.draw(context);
      this.me.draw(context);
      this.me.update(deltaTime);
    }
    update(deltaTime) {
      this.me.update(deltaTime);
    }
// collision detection is where I am stuck. To detect sprite has collided with cabins and pond, would bring the next step of viewing things like about me, previous work etc.
    collision(obj1, obj2) {
      return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.h > obj2.y
      );
    }
  }
  // create an instance of game class.
  const portfolio = new Portfolio(canvas.width, canvas.height); //new keyword will create an instance of an object that has constructor function. look for a Class with that name ie. Game
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    portfolio.render(ctx, deltaTime);
    requestAnimationFrame(animate); // passing animate sends function into a loop
  }

  animate(0);
});
