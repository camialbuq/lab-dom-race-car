class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    //left is the horizontal position of the car
    this.left = left;
    //top is the vertical position of the car
    this.top = top;
    //width of the car element
    this.width = width;
    //height of the car element
    this.height = height;
    //it will be used to specify the horizontal movement: 0, 1 (right), -1(left)
    this.directionX = 0;
    //it will be used to specify the vertical movement: 0, 1 (down), -1(up)
    this.directionY = 0;

    //adding the image
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    //In order to set the exact position of the player element on the game screen, it should be positioned absolutely
    this.element.style.position = "absolute";
    //the exact position will be set by the passed properties
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
    this.gameScreen.appendChild(this.element);
  }

  //methods of the player class
  move() {
    this.left += this.directionX;
    this.top += this.directionY;

    //make sure car stays on screen
    //check examples on: https://codesandbox.io/p/sandbox/handleboundries-rf9o7q?file=%2Fsrc%2Findex.js%3A14%2C1-37%2C37
    const minLeft = 50;
    const minTop = 50;
    const maxLeft = this.gameScreen.offsetWidth - this.width - 50; //going to the right side
    //it depends on screen size of user, so total value will always be total screen - player element width - 10 margin
    const maxTop = this.gameScreen.offsetHeight - this.height - 50; //going to the bottom
    // console.log(maxLeft);

    if (this.left < minLeft) {
      this.left = minLeft; //set back to 10
    }

    if (this.top < minTop) {
      this.top = minTop; // set back to 10
    }

    if (this.left > maxLeft) {
      this.left = maxLeft; //set again to the max on the right side
    }

    if (this.top > maxTop) {
      this.top = maxTop; //set again to the max bottom
    }

    //update the players position
    this.updatePosition(); //it will be defined below
  } //end of move

  updatePosition() {
    //similar to what we defined above in constructor that was the initial value
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  } //end of updatePosition

  //collision detection algorithm using the bounding rectangles of two elements
  didCollide(obstacle) {
    //the getBoundingClientRect() method returns a DOMRect object that bounds the contents of the range;
    //this is a rectangle enclosing the union of the bounding rectangles for all the elements in the range.
    //returns an object with properties describing the element's position in the viewport.
    const playerRect = this.element.getBoundingClientRect(); //this because we are still inside the player class
    const obstacleRect = obstacle.element.getBoundingClientRect(); //gets the boundary position of the obstacle element in the viewport.

    //checking for position overlapping
    if (
      //Checks if the left side of the player element is to the left of the right side of the obstacle element.
      playerRect.left < obstacleRect.right && //left side of player is to the left side of obstacle
      playerRect.right > obstacleRect.left && //right side of player is to the right side of obstacle
      playerRect.top < obstacleRect.bottom && //top of player is above the bottom of obstacle
      playerRect.bottom > obstacleRect.top //bottom of player is below the top of obstacle element
    ) {
      return true; //because player invading the rectangle of obstacle
    } else {
      return false;
    }
  } //end of didCollide
} //end of player class
