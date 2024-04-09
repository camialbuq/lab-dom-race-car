//iteration 6
class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    //randomly generated horizontal position of the obstacle car, so obstacle starts
    //from different location
    this.left = Math.floor(Math.random() * 300 + 70);
    //initial vertical position of the obstacle car
    this.top = 0;
    //width of the obstacle element
    this.width = 60;
    //height of the obstacle element
    this.height = 90;

    //adding the image
    this.element = document.createElement("img");
    this.element.src = "./images/Cactus.png";
    //In order to set the exact position of the player element on the game screen, it should be positioned absolutely
    this.element.style.position = "absolute";
    //the exact position will be set by the passed properties
    this.element.style.width = `${this.width}px`; //in the player we didnt need "this"
    // because we passed width as a constructor parameter
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.gameScreen.appendChild(this.element);
  } //end of obstacle constructor

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    //Move the obstacle down by 3px by continuously updating its top property.
    //this will make it move down the screen - remember down = 1, up = -1 defined also on player
    //this.top controls the vertical position of the element, initiates at 0
    this.top += 4;
    //update the obstacle position on the screen
    this.updatePosition();
  }
} //end of obstacle class

//ONLY WITH THIS THE OBSTACLE CAR STILL DOES NOT APPEAR
//because we actually will need to create a new instance of the class Obstacle
// which will be done in the update() inside of class Game
