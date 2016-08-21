import Main from "./states/Main";

class Game extends Phaser.Game {
  constructor({ width, height, engine, domNode }) {
    super(width, height, engine, domNode);

    this.state.add("Main", Main);
  }

  start() {
    this.state.start("Main");
  }
}

export default Game;
