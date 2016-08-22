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

    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);
    this.spawningPositions = spawningPositions;
  }

  /**
   * Respawn koin in random locations.
   */
  respawn() {
    let positions;

    for (let i = 0; i < this.spawningPositions.length; i++)
      if (this.spawningPositions[i].x == this.x)
        positions = this.spawningPositions.slice(i, 1);

    let positions = positions[
      this.game.rnd.integerInRange(0, coinPositions.length - 1)
    ];

    this.reset(position.x, position.y);
  }

}

export default Koin;
