import Game from "./javascripts/Game";

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
