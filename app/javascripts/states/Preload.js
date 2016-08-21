/**
 * Class representing Preload State.
 * This is where all static assets are
 * preloaded.
 * @extends Phaser.State
 */
class Preload extends Phaser.State {
  
  /**
   * Preload all game assets.
   * As soon as the loading finished,
   * transition to the next state.
   */
  preload() {
  }

  /**
   * Transition to Main state.
   */
  goToMain() {
    this.game.state.start("Main");
  }
}

export default Preload;
