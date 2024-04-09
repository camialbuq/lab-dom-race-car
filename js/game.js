// This is the file where we will define the Game class to represent
// the game's data (properties) and behaviors (methods).

//iteraction 01 - define the game class
class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    //player takes the following parameters defined on player.js
    //constructor(gameScreen, left, top, width, height, imgSrc)
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      60,
      110,
      "./images/coolPinkCar.png"
    );
    this.height = 600;
    this.width = 500;
    //we will store obstacles here once we create
    this.obstacles = [];
    //this score will increase every time obstacle is passed
    this.score = 0;
    //remaining lives that player has, starts with 3
    this.lives = 3;
    //boolean flag to check if over or not
    this.gameIsOver = false;
    //this is a variable used to store the id of the interval running the game loop
    //we will need to clear this interval when over
    this.gameIntervalId;
    // a number that indicates the interval in milliseconds at which the game loop will execute.
    this.gameLoopFrequency = Math.round(1000 / 60); //this is 60fps
  }

  //methods inside of the game class

  //initializes the game
  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //hides the start screen
    this.startScreen.style.display = "none";
    //displays the game screen
    this.gameScreen.style.display = "block";
    setInterval(() => {
      //repeatedly execute the gameLoop function which will be declared at 60x per second
      this.gameLoop();
    }, this.gameLoopFrequency);
  } //end of the start method

  //runs the game loop
  gameLoop() {
    //console.log("in the game loop"); //dont forget to console.log to check if working
    this.update();
    if (this.gameIsOver) {
      //it interrupts the game interval by calling clearInterval while passing the gameIntervalId as an argument.
      clearInterval(this.gameIntervalId);
    }
  } //end of gameLoop method

  //updating the game state during each loop
  update() {
    //console.log("in the update method");
    this.player.move();

    // Check for collision and if an obstacle is still on the screen
    //iterate through the list of obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move(); //move the obstacle as we defined speed in obstacle.js
      //adding more obstacles if the first obstacle passes half of the screen
      if (obstacle.top > this.height / 2 && this.obstacles.length < 2) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
      // If the player's car collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        //didCollide described in player
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array - why? (???)
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        // Update the counter variable to account for the removed obstacle
        i--;
      } // If the obstacle is off the screen (at the bottom)
      else if (obstacle.top > this.height) {
        //everytime we move we are changing the obstacle top
        // Increase the score by 1
        this.score++;
        // Remove the obstacle from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.gameIsOver = true;

    //hide game screen
    this.gameScreen.style.display = "none";
    //show the end screen
    this.gameEndScreen.style.display = "block";
  }
} //end of the class Game

//Omar's explanation why we put fixed properties also inside of constructor,
//because we will need to access it afterwards by using "this.whatever"
//   greetUser() {
//     console.log(this.height)
//   }

//testing here if i got the elements correctly by console log.
// startScreen = document.querySelector("#game-intro");
// gameScreen = document.querySelector("#game-screen");
// gameEndScreen = document.querySelector("#game-end");

// console.log(startScreen);
// console.log(gameScreen);
// console.log(gameEndScreen);
