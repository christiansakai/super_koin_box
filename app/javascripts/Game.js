import Boot from "./states/Boot";
import Load from "./states/Load";
import Menu from "./states/Menu";
import Play from "./states/Play";

/**
 * Class representing Game.
 * @extends Phaser.Game
 */
class Game extends Phaser.Game {

  /**
   * Create a new game by adding
   * all the game states.
   * Also create global object to hold
   * the game's score.
   * @param {object} config basic game configuration
   * @param {number} config.width screen width in pixels
   * @param {number} config.width screen height in pixels
   * @param {number} config.engine rendering engine of the game
   * @param {string} config.domNode ID of dom node where this game will be mounted
   */
  constructor({ width, height, engine, domNode }) {
    super(width, height, engine, domNode);

    // Global object to be used
    // throughout the game.
    this.global = {
      score: 0
    };

    this.state.add("Boot", Boot);
    this.state.add("Load", Load);
    this.state.add("Menu", Menu);
    this.state.add("Play", Play);
  }

  /**
   * Start the game by going to
   * the Preload state.
   */
  start() {
    this.state.start("Boot");
  }
}

export default Game;
