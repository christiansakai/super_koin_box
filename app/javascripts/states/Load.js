/**
 * Class representing Load State.
 * This is where all static assets are
 * preloaded.
 * @extends Phaser.State
 */
class Load extends Phaser.State {
  
  /**
   * Preload all game assets.
   * As soon as the loading finished,
   * transition to the next state.
   */
  preload() {
    this.setLoadingSystem();
    this.loadImages();
    this.loadSounds();
    this.loadJSONs();
  }

  /**
   * Set loading system by creating
   * loading label, progress bar, and
   * calling `this.goToMenu` function
   * onces all assets loading are completed.
   */
  setLoadingSystem() {
    // Create and add loading label
    const loadingLabel = this.game
      .add.text(this.game.world.centerX, 
                150, 
                "loading...",
                { 
                  font: "30px Arial",
                  fill: "#FFFFFF"
                });
    loadingLabel.anchor.setTo(0.5, 0.5);

    // Create and add progress bar
    const progressBar = this.game
      .add.sprite(this.game.world.centerX, 
                  200,
                  "progressBar");
    progressBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(progressBar);

    // After assets loading completed, run
    // `this.goToMenu` function
    this.game.load.onLoadComplete.add(this.goToMenu, this);
  }

  /**
   * Load all image assets.
   */
  loadImages() {
    this.game.load.image("player", "/player.png");
    // Special sprite that contains
    // animation frames. Each
    // frame is 20 x 20 pixels.
    this.game.load.spritesheet("playerAnimated", "/playerAnimated.png", 20, 20);
    this.game.load.image("wallVertical", "/wallVertical.png");
    this.game.load.image("wallHorizontal", "/wallHorizontal.png");
    this.game.load.image("background", "/background.png");
    this.game.load.image("tileset", "/tileset.png");
    this.game.load.image("koin", "/coin.png");
    this.game.load.image("enemy", "/enemy.png");
    this.game.load.image("jumpButton", "/jumpButton.png");
    this.game.load.image("leftButton", "/leftButton.png");
    this.game.load.image("rightButton", "/rightButton.png");
    this.game.load.image("muteButton", "/muteButton.png");
    this.game.load.image("pixel", "/pixel.png");
  }

  /**
   * Load all sound assets.
   */
  loadSounds() {
    this.game.load.audio("koin", ["/coin.ogg", "/coin.mp3"]);
    this.game.load.audio("dead", ["/dead.ogg", "/dead.mp3"]);
    this.game.load.audio("jump", ["/jump.ogg", "/jump.mp3"]);
  }

  /**
   * Load all JSON assets.
   */
  loadJSONs() {
  }

  /**
   * Transition to Menu state.
   */
  goToMenu() {
    this.game.state.start("Menu");
  }
}

export default Load;
