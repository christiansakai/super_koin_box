/**
 * Class representing Player.
 * @extends Phaser.Sprite
 */
class Player extends Phaser.Sprite {

  /**
   * Create the player.
   * @param {object} config player configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} config.x x-axis location for the player
   * @param {number} config.y y-axis location for the player
   * @param {string} config.asset preloaded asset for the player
   * @param {object} config.sound sound configuration
   * @param {string} config.sound.jump sound to be played when player jumps
   */
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.setupBasics();
    this.setAnimations();
  }

  /**
   * Sets up basic setting
   * and physics.
   */
  setupBasics() {
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = 500;
  }

  /**
   * Add animations for player movement.
   */
  setAnimations() {
    this.animations.add("moveRight", [1, 2], 8, true);
    this.animations.add("moveLeft", [3, 4], 8, true);
  }

  /**
   * Move the player
   * according to pressed cursor.
   * @param {object} cursor an object contains `up`, `down`, `left`, `right` of Phaser.Key object
   * @param {Phaser.Key} cursor.up Phaser.Key object for `up`
   * @param {Phaser.Key} cursor.down Phaser.Key object for `down`
   * @param {Phaser.Key} cursor.left Phaser.Key object for `left`
   * @param {Phaser.Key} cursor.right Phaser.Key object for `right`
   */
  move(cursor) {
    if (cursor.left.isDown) {
      this.body.velocity.x = -200;
      this.animations.play("moveLeft");
    } else if (cursor.right.isDown) {
      this.body.velocity.x = 200;
      this.animations.play("moveRight");
    } else {
      this.body.velocity.x = 0;
      // Stop the animation
      // and sets the player frame
      // to 0 (stand still).
      this.animations.stop();
      this.player.frame = 0;
    }

    // Only jumps if the player is on the ground
    if (cursor.up.isDown && this.body.touching.down)
      this.body.velocity.y = -320;
  }

}

export default Player;
