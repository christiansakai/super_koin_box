/**
 * Class representing an enemy.
 * @extends Phaser.Sprite
 */
class Enemy extends Phaser.Sprite {

  /**
   * Create an enemy.
   * @param {object} config enemy configuration
   * @param {Phaser.Game} config.game the current game object
   * @param {number} config.x x-axis coordinate of an enemy
   * @param {number} config.y y-axis coordinate of an enemy
   * @param {string} config.asset preloaded assets for displaying an enemy
   */
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.setAttributes();
  }

  /**
   * Set the attributes needed for one enemy.
   */
  setAttributes() {
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 1);
    this.body.gravity.y = 500;
    this.body.velocity.x = 100;

    // Bounce when this object hits
    // another object with Physics.
    // This will make the enemy change direction
    // when hitting a wall horizontally.
    this.body.bounce.x = 1;
    // Check if this sprite is inside the World
    this.checkWorldBounds = true;
    // Kill this sprite if it is out of bounds
    this.outOfBoundsKill = true;
  }

}

export default Enemy;
