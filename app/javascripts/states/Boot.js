/**
 * Class representing Boot State.
 * Game boots up here with loading bar
 * and setting up basic physics.
 * @extends Phaser.State
 */
class Boot extends Phaser.State {
  
  /**
   * Load the progress bar to be used
   * for the next (Load) state.
   */
  preload() {
    this.game.load.image("progressBar", "/progressBar.png");
  }

  /**
   * Initialize stage's background color
   * and game Physics.
   * Go to Load state once finished.
   */
  create() {
    this.game.stage.backgroundColor = "#3498db";
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.start("Load");
  }
  
}

export default Boot;
