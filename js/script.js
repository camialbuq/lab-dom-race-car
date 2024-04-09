//This file contains code that handles the game's start button.

//ensure that all page elements are loaded before any other scripts are executed.
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    //console.log("start game");
    //create a new instance of the Game class
    game = new Game();
    //start the game by invoking method for this game
    game.start();
  }

  //task iteration 5 - function to capture keyboard movement
  //add an event listener in the js/script.js file, which will update the player's car directionX
  //and directionY properties based on the keys that the user presses on the keyboard.
  //This function listens for the keydown event using document.onkeydown
  //and checks if the pressed key matches any of the allowed keystrokes
  function handleKeydown(event) {
    const key = event.key; //placeholder to capture the event result
    //an array with the keys that user can press
    const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
    //compare the pressed key with the possible keys array
    if (possibleKeys.includes(key)) {
      event.preventDefault();
      //stops the default action of an element from happening.
      // For example: Prevent a submit button from submitting a form.
      //in this case when we use arrow up or down on a browser we would scroll the page
      //we want to stop that in order to use the keys to control the car

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        //default is 1, passing with 3 because the car was too slow
        case "ArrowLeft":
          game.player.directionX = -2;
          break;
        case "ArrowUp":
          game.player.directionY = -2;
          break;
        case "ArrowRight":
          game.player.directionX = 2;
          break;
        case "ArrowDown":
          game.player.directionY = 2;
          break;
      }
    } //end of if possiblekeys
  } //end of handleKeydown

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }

  window.addEventListener("keydown", handleKeydown);
}; //end of window.onload
