/**
 * Class representing Menu State.
 * @extends Phaser.State
 */
class Menu extends Phaser.State {

  /**
   * Create all objects for
   * this state.
   */
  create() {
    this.createBackground();
    this.createTitleLabel();
    this.createScoreLabel();
    this.createStartLabel();
    this.createStartControl();
  }

  /**
   * Add background image.
   */
  createBackground() {
    this.game.add.image(0, 0, "background");
  }

  /**
   * Create and add title
   * and its animations.
   */
  createTitleLabel() {
    const title = this.game
      .add.text(this.game.world.centerX, 
                0, 
                "Super Koin Box",
                {
                  font: "50px Arial",
                  fill: "#FFFFFF"
                });
    title.anchor.setTo(0.5, 0.5);

    const tween = this.game.add.tween(title);
    tween.to({ y: 80 }, 1000).easing(Phaser.Easing.Bounce.Out);
    tween.start();
  }

  /**
   * Create and add score.
   * Score will be taken from global
   * variable in the game.
   */
  createScoreLabel() {
    const score = this.game
      .add.text(this.game.world.centerX, 
                this.game.world.centerY,
                `score: ${this.game.global.score}`,
                {
                  font: "25px Arial",
                  fill: "#FFFFFF"
                });
    score.anchor.setTo(0.5, 0.5);
  }

  /**
   * Create start label and its animations. 
   * Explains how to start the game.
   */
  createStartLabel() {
    const startLabel = this.game
      .add.text(this.game.world.centerX,
                this.game.world.height - 80,
                "press the up arrow key to start",
                {
                  font: "25px Arial",
                  fill: "#FFFFFF"
                });
    startLabel.anchor.setTo(0.5, 0.5);

    const tween = this.game.add.tween(startLabel);
    tween.to({ angle: -2 }, 500);
    tween.to({ angle: 2 }, 500);
    tween.loop();
    tween.start();
  }

  /**
   * Create control to start
   * the game.
   */
  createStartControl() {
    const upKey = this.game.input
      .keyboard.addKey(Phaser.Keyboard.UP);

    upKey.onDown.addOnce(this.goToPlay, this);
  }

  /**
   * Go to Play state.
   */
  goToPlay() {
    this.game.state.start("Play");
  }

}

export default Menu;
