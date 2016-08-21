import Preload from "./states/Preload";
import Main from "./states/Main";

/**
 * Class representing Game.
 * @extends Phaser.Game
 */
class Game extends Phaser.Game {

  /**
   * Create a new game by adding
   * all the game states.
   * @param {object} config basic game configuration
   * @param {number} config.width screen width in pixels
   * @param {number} config.width screen height in pixels
   * @param {number} config.engine rendering engine of the game
   * @param {string} config.domNode ID of dom node where this game will be mounted
   */
  constructor({ width, height, engine, domNode }) {
    super(width, height, engine, domNode);

    this.state.add("Main", Main);
    this.state.add("Preload", Preload);
  }

  /**
   * Start the game by going to
   * the Preload state.
   */
  start() {
    this.state.start("Preload");
  }
}

export default Game;
