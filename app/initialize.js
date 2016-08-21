import Game from "./javascripts/Game";

/**
 * @function
 * Start a new game and
 * mount it on a DOM with
 * ID "game".
 */
const startGame = () => {
  const game = new Game({
    width: 500,
    height: 340,
    engine: Phaser.AUTO,
    domNode: "game"
  });

  game.start();
};

document.addEventListener('DOMContentLoaded', startGame);
