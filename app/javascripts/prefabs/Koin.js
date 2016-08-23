/**
 * Class representing Koin.
 * @extends Phaser.Sprite
 */
class Koin extends Phaser.Sprite {

  /**
   * Create new Koin.
   * @param {object} config the koin configuration
   * @param {Phaser.Game} config.game the current running game object
   * @param {number} config.x x-axis of the first spawning koin
   * @param {number} config.y y-axiss of the first spawning koin
   * @param {object[]} config.coinPositions the positions where koin will respawn
   * @param {number} config.spawningPositions[].x x-axis of spawning koin
   * @param {number} config.spawningPositions[].y y-axis of spawning koin
   */
  constructor({ game, x, y, asset, spawningPositions }) {
    super(game, x, y, asset);

    this.setupBasics(spawningPositions);
  }

  /**
   * Set basic Physics, anchor
   * and spawning positions.
   */
  setupBasics(spawningPositions) {
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
    this.spawningPositions = spawningPositions;
  }

  /**
   * Tween the coin.
   */
  shrinkAndGrow() {
    // Make the coin invisible
    this.scale.setTo(0, 0);
    // Quickly grow back the coin
    // to its original scale
    this.game.add.tween(this.scale)
      .to({ x: 1, y: 1 }, 300)
      .start();
  }

  /**
   * Respawn koin in random locations.
   */
  respawn() {
    let positions;

    for (let i = 0; i < this.spawningPositions.length; i++)
      if (this.spawningPositions[i].x == this.x) {
        // Copy into a new array
        positions = this.spawningPositions.slice();
        // and remove that element from that 
        // new array
        positions.splice(i, 1);
      }

    let position = positions[
      this.game.rnd.integerInRange(0, positions.length - 1)
    ];

    this.reset(position.x, position.y);
  }

}

export default Koin;
